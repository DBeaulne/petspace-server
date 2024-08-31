/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pet', (table) => {
   table.increments('id').primary();
   table.string('name').notNullable();
   table.string('pet_type').notNullable();
   table.string('size').notNullable();
   table.string('temperment').notNullable();
   table.integer('age').notNullable();
   table.string('foot_serving').notNullable();
   table.string('foot_type').notNullable();
   table.string('activities').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('pet');
};
