exports.up = function(knex) {
  return knex.schema
    .alterTable("accounts", (table) => {
      table.string("roles").notNullable().defaultTo("owner");
    })
    .alterTable("sitters", (table) => {
      table.string("status").notNullable().defaultTo("approved");
      table.decimal("hourly_rate", 8, 2).notNullable().defaultTo(25);
      table.text("bio").nullable();
      table.integer("service_radius_km").notNullable().defaultTo(35);
      table.string("profile_image_url").nullable();
    })
    .alterTable("pet", (table) => {
      table.uuid("owner_account_id").nullable();
      table
        .foreign("owner_account_id")
        .references("id")
        .inTable("accounts")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
    })
    .createTable("sitter_applications", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("phone").nullable();
      table.string("city").notNullable();
      table.string("province").notNullable().defaultTo("ON");
      table.string("postal_code").notNullable();
      table.decimal("lat", 10, 8).nullable();
      table.decimal("lng", 11, 8).nullable();
      table.decimal("hourly_rate", 8, 2).notNullable().defaultTo(25);
      table.integer("service_radius_km").notNullable().defaultTo(35);
      table.text("bio").notNullable();
      table.text("accepted_pet_types").notNullable();
      table.text("accepted_pet_sizes").notNullable();
      table.string("status").notNullable().defaultTo("pending");
      table.timestamp("date_created").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("inquiries", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.uuid("sitter_id").notNullable();
      table.uuid("owner_account_id").nullable();
      table.string("owner_name").notNullable();
      table.string("owner_email").notNullable();
      table.text("message").notNullable();
      table.string("pet_type").notNullable();
      table.string("pet_size").notNullable();
      table.dateTime("start_datetime").nullable();
      table.dateTime("end_datetime").nullable();
      table.string("location_label").nullable();
      table.string("status").notNullable().defaultTo("sent");
      table.timestamp("date_created").defaultTo(knex.fn.now());
      table
        .foreign("sitter_id")
        .references("id")
        .inTable("sitters")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("owner_account_id")
        .references("id")
        .inTable("accounts")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("inquiries")
    .dropTableIfExists("sitter_applications")
    .alterTable("sitters", (table) => {
      table.dropColumn("profile_image_url");
      table.dropColumn("service_radius_km");
      table.dropColumn("bio");
      table.dropColumn("hourly_rate");
      table.dropColumn("status");
    })
    .alterTable("pet", (table) => {
      table.dropForeign("owner_account_id");
      table.dropColumn("owner_account_id");
    })
    .alterTable("accounts", (table) => {
      table.dropColumn("roles");
    });
};
