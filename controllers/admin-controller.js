const knex = require("knex")(require("../knexfile"));

const sitterApplications = async (req, res) => {
  try {
    const applications = await knex("sitter_applications").orderBy("date_created", "desc");
    return res.json(applications);
  } catch (error) {
    return res.status(500).json({ message: `Unable to load applications: ${error.message}` });
  }
};

const updateSitterApplication = async (req, res) => {
  const { status } = req.body;

  if (!["approved", "rejected", "hidden", "pending"].includes(status)) {
    return res.status(400).json({ message: "Invalid application status" });
  }

  try {
    const application = await knex("sitter_applications").where({ id: req.params.id }).first();

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await knex.transaction(async (trx) => {
      await trx("sitter_applications").where({ id: req.params.id }).update({ status });

      if (status === "approved") {
        const existingAccount = await trx("accounts").where({ email: application.email }).first();
        let accountId = existingAccount?.id;

        if (!existingAccount) {
          await trx("accounts").insert({
            email: application.email,
            passwordHash: "pending",
            passwordSalt: "",
            roles: "sitter"
          });
          const newAccount = await trx("accounts").where({ email: application.email }).first();
          accountId = newAccount.id;
        } else if (!String(existingAccount.roles || "").includes("sitter")) {
          const roles = [existingAccount.roles || "owner", "sitter"].join(",");
          await trx("accounts").where({ id: existingAccount.id }).update({ roles });
        }

        const existingSitter = await trx("sitters").where({ email: application.email }).first();

        const sitterPayload = {
          first_name: application.first_name,
          last_name: application.last_name,
          email: application.email,
          address: "Private",
          city: application.city,
          province: application.province,
          postal_code: application.postal_code,
          lat: application.lat,
          lng: application.lng,
          availability: true,
          account_id: accountId,
          status: "approved",
          hourly_rate: application.hourly_rate,
          bio: application.bio,
          service_radius_km: application.service_radius_km
        };

        if (existingSitter) {
          await trx("sitters").where({ id: existingSitter.id }).update(sitterPayload);
        } else {
          await trx("sitters").insert(sitterPayload);
        }

        const sitter = await trx("sitters").where({ email: application.email }).first();
        const petTypes = String(application.accepted_pet_types || "")
          .split(",")
          .map((type) => type.trim())
          .filter(Boolean);
        const petSizes = String(application.accepted_pet_sizes || "")
          .split(",")
          .map((size) => size.trim())
          .filter(Boolean);
        const typeNames = petTypes.flatMap((type) => {
          if (type === "Dog") {
            return petSizes.map((size) => `${size === "Huge" ? "Large" : size} Dog`).concat("Dogs");
          }
          if (type === "Cat") {
            return ["Cats"];
          }
          if (type === "Reptile") {
            return ["Reptiles"];
          }
          return [type];
        });

        for (const name of [...new Set(typeNames)]) {
          let petType = await trx("pet_types").where({ name }).first();
          if (!petType) {
            await trx("pet_types").insert({ name });
            petType = await trx("pet_types").where({ name }).first();
          }

          const existingPreference = await trx("sitter_pet_types")
            .where({ sitter_id: sitter.id, pet_type_id: petType.id })
            .first();

          if (!existingPreference) {
            await trx("sitter_pet_types").insert({ sitter_id: sitter.id, pet_type_id: petType.id });
          }
        }
      }
    });

    return res.json({ message: "Application updated" });
  } catch (error) {
    return res.status(500).json({ message: `Unable to update application: ${error.message}` });
  }
};

module.exports = { sitterApplications, updateSitterApplication };
