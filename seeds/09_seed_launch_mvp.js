const bcrypt = require("bcrypt");

exports.seed = async function(knex) {
  const ownerPassword = await bcrypt.hash("Password123!", 10);
  const adminPassword = await bcrypt.hash("PetSpaceAdmin123!", 10);

  await knex("accounts").update({ passwordHash: ownerPassword, passwordSalt: "" });

  await knex("accounts")
    .whereIn("email", ["john.doe@example.com", "jane.smith@example.com"])
    .update({ roles: "owner" });

  await knex("accounts")
    .whereNotIn("email", ["john.doe@example.com", "jane.smith@example.com"])
    .update({ roles: "sitter" });

  await knex("sitters").update({
    status: "approved",
    hourly_rate: 28,
    bio: "Approved Durham Region sitter with experience caring for local pets.",
    service_radius_km: 40
  });

  const adminEmail = "admin@petspace.local";
  const existingAdmin = await knex("accounts").where({ email: adminEmail }).first();

  if (!existingAdmin) {
    await knex("accounts").insert({
      id: knex.raw("(UUID())"),
      email: adminEmail,
      passwordHash: adminPassword,
      passwordSalt: "",
      roles: "admin"
    });
  } else {
    await knex("accounts").where({ email: adminEmail }).update({
      passwordHash: adminPassword,
      passwordSalt: "",
      roles: "admin"
    });
  }
};
