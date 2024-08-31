/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('sitter', (table) => {
  table.increments('id').primary();
  table.string('first_name').notNullable();
  table.string('last_name').notNullable();
  table.string('email').notNullable();
  table.string('address').notNullable();
  table.string('city').notNullable();
  table.string('province').notNullable();
  table.string('postal_code').notNullable();
  table.string('account_id')
   .references('account.id')
   .onUpdate('CASCADE')
   .onDelete('CASCADE');
  });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('sitter');
};
