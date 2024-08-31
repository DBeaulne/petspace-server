/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_pet', (table) => {
  table.increments('id').primary();
  table.string('user_id')
    .references('user.account_id')
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
  return knex.schema.dropTable('user_pet');
};
