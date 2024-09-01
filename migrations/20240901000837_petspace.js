/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('account', (table) => {
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
  })
  .createTable('user', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('address').notNullable();
    table.string('city').notNullable();
    table.string('province').notNullable();
    table.string('postal_code').notNullable();
    table.string('account_id').notNullable();
    table
      .foreign('account_id')    
      .references('id')
      .inTable('user')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
  /* 
  .createTable('sitter', (table) => {
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
  })
  .createTable('pet', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('pet_type').notNullable();
    table.string('size').notNullable();
    table.string('temperment').notNullable();
    table.integer('age').notNullable();
    table.string('foot_serving').notNullable();
    table.string('foot_type').notNullable();
    table.string('activities').notNullable();
  })
  .createTable('sitter_bridge', (table) => {
    table.increments('id').primary();
    table.string('sitter_id')
      .references('sitter.account_id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('pet_id')
      .references('pet.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
  .createTable('users_pet', (table) => {
    table.increments('id').primary();
    table.string('user_id')
      .references('user.account_id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('pet_id')
      .references('pet.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  }) */
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('users_pet')
    .dropTable('sitter_bridge')
    .dropTable('pet')
    .dropTable('sitter')
    .dropTable('user')
    .dropTable('account');
};
