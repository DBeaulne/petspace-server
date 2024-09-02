/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('account', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
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
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('province').notNullable();
      table.string('postal_code').notNullable();
      table.decimal('latitude', 10, 8).notNullable();  // Added latitude column
      table.decimal('longitude', 11, 8).notNullable();  // Added longitude column
      table.uuid('account_id').notNullable();
      table
        .foreign('account_id')
        .references('id')
        .inTable('account')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('sitter', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('province').notNullable();
      table.string('postal_code').notNullable();
      table.decimal('latitude', 10, 8).notNullable();  // Added latitude column
      table.decimal('longitude', 11, 8).notNullable();  // Added longitude column
      table.uuid('account_id').notNullable();
      table
        .foreign('account_id')
        .references('id')
        .inTable('account')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
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
    })
    .createTable('sitter_bridge', (table) => {
      table.integer('id').unsigned().primary();
      table.uuid('sitter_id').notNullable();
      table.uuid('pet_id').notNullable();
      table
        .foreign('sitter_id')
        .references('account_id')
        .inTable('sitter')
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
        .inTable('user')
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
    .dropTable('sitter')
    .dropTableIfExists('user')
    .dropTableIfExists('account');
};
