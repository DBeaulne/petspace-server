/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('account', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable();
      table.string('stripe_customer_id').notNullable();
      table.string('stripe_subscription_id').notNullable();
      table.string('paypal_customer_id').notNullable();
      table.string('payment_preference').notNullable();
      table.string('passwordHash').notNullable();
      table.string('passwordSalt').notNullable();
      table.timestamp('date_created').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('account')
};
