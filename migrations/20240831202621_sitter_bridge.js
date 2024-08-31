/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('sitter_bridge', (table) => {
  table.increments('id').primary();
  table.string('sitter_id')
    .references('sitter.account_id')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  table.string('pet_id')
    .references('pet.id')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('siiter_bridge');
};
