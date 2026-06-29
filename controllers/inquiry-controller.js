const knex = require("knex")(require("../knexfile"));

const sendInquiryEmail = async ({ sitter, inquiry }) => {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return { skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
      to: sitter.email,
      subject: `New PetSpace inquiry from ${inquiry.owner_name}`,
      text: [
        `${inquiry.owner_name} sent you a PetSpace inquiry.`,
        `Email: ${inquiry.owner_email}`,
        `Pet: ${inquiry.pet_type} (${inquiry.pet_size})`,
        `Care window: ${inquiry.start_datetime || "Not specified"} to ${inquiry.end_datetime || "Not specified"}`,
        `Location: ${inquiry.location_label || "Durham Region"}`,
        "",
        inquiry.message
      ].join("\n")
    })
  });

  if (!response.ok) {
    throw new Error(`Resend returned ${response.status}`);
  }

  return response.json();
};

const createInquiry = async (req, res) => {
  const {
    sitterId,
    ownerName,
    ownerEmail,
    message,
    petType,
    petSize,
    startDateTime = null,
    endDateTime = null,
    locationLabel = null
  } = req.body;

  if (!sitterId || !ownerName || !ownerEmail || !message || !petType || !petSize) {
    return res.status(400).json({ message: "Missing required inquiry fields" });
  }

  try {
    const sitter = await knex("sitters").where({ id: sitterId, status: "approved" }).first();

    if (!sitter) {
      return res.status(404).json({ message: "Approved sitter not found" });
    }

    const inquiry = {
      sitter_id: sitterId,
      owner_account_id: req.user?.accountId || null,
      owner_name: ownerName,
      owner_email: ownerEmail,
      message,
      pet_type: petType,
      pet_size: petSize,
      start_datetime: startDateTime,
      end_datetime: endDateTime,
      location_label: locationLabel,
      status: "sent"
    };

    await knex("inquiries").insert(inquiry);

    try {
      await sendInquiryEmail({ sitter, inquiry });
    } catch (emailError) {
      const failedInquiry = await knex("inquiries")
        .where({ sitter_id: sitterId, owner_email: ownerEmail })
        .orderBy("date_created", "desc")
        .first();

      if (failedInquiry) {
        await knex("inquiries").where({ id: failedInquiry.id }).update({ status: "email_failed" });
      }

      return res.status(202).json({ message: "Inquiry saved, but email delivery failed" });
    }

    return res.status(201).json({ message: "Inquiry sent" });
  } catch (error) {
    return res.status(500).json({ message: `Unable to send inquiry: ${error.message}` });
  }
};

module.exports = { createInquiry };
