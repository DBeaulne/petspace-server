/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('accounts', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
      table.string('email').notNullable();
      table.string('stripe_customer_id').nullable();
      table.string('stripe_subscription_id').nullable();
      table.string('paypal_customer_id').nullable();
      table.string('payment_preference').nullable();
      table.string('passwordHash').notNullable();
      table.string('passwordSalt').notNullable();
      table.timestamp('date_created').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    })
    .createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('province').notNullable();
      table.string('postal_code').notNullable();
      table.decimal('latitude', 10, 8).nullable();
      table.decimal('longitude', 11, 8).nullable();
      table.timestamp('date_created').defaultTo(knex.fn.now());  // Added date_created
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));  // Added updated_at
      table.uuid('account_id').notNullable();
      table
        .foreign('account_id')
        .references('id')
        .inTable('accounts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('sitters', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('province').notNullable();
      table.string('postal_code').notNullable();
      table.decimal('latitude', 10, 8).nullable();
      table.decimal('longitude', 11, 8).nullable();
      table.boolean('availability').notNullable();
      table.timestamp('date_created').defaultTo(knex.fn.now());  // Added date_created
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));  // Added updated_at
      table.uuid('account_id').notNullable();
      table
        .foreign('account_id')
        .references('id')
        .inTable('accounts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('pet_types', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
    })
    .createTable('sitter_pet_types', (table) => {
      table.uuid('sitter_id').notNullable();
      table.integer('pet_type_id').unsigned().notNullable();
      table
        .foreign('sitter_id')
        .references('id')
        .inTable('sitters')
        .onDelete('CASCADE');
      table
        .foreign('pet_type_id')
        .references('id')
        .inTable('pet_types')
        .onDelete('CASCADE');
      table.primary(['sitter_id', 'pet_type_id']);
    })
    .createTable('pet', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
      table.string('name').notNullable();
      table.string('pet_type').notNullable();
      table.string('size').notNullable();
      table.string('temperament').notNullable();
      table.integer('age').notNullable();
      table.string('food_serving').notNullable();
      table.string('food_type').notNullable();
      table.string('activities').notNullable();
      table.timestamp('date_created').defaultTo(knex.fn.now());  // Added date_created
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));  // Added updated_at
    })
    .createTable('sitter_bridge', (table) => {
      table.integer('id').unsigned().primary();
      table.uuid('sitter_id').notNullable();
      table.uuid('pet_id').notNullable();
      table
        .foreign('sitter_id')
        .references('account_id')
        .inTable('sitters')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .foreign('pet_id')
        .references('id')
        .inTable('pet')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('user_pet', (table) => {
      table.integer('id').unsigned().primary();
      table.uuid('user_id').notNullable();
      table.uuid('pet_id').notNullable();
      table
        .foreign('user_id')
        .references('account_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .foreign('pet_id')
        .references('id')
        .inTable('pet')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('user_pet')
    .dropTable('sitter_bridge')
    .dropTable('pet')
    .dropTable('sitter_pet_types')
    .dropTable('pet_types')
    .dropTable('sitters')
    .dropTableIfExists('users')
    .dropTableIfExists('accounts');
};
