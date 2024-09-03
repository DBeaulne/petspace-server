/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('accounts').del();
  
  // Inserts seed entries
  await knex('accounts').insert([
    {
      id: knex.raw('(UUID())'),
      email: 'john.doe@example.com',
      stripe_customer_id: 'stripe_cust_01',
      stripe_subscription_id: 'stripe_sub_01',
      paypal_customer_id: 'paypal_cust_01',
      payment_preference: 'stripe',
      passwordHash: 'hashedpassword1',
      passwordSalt: 'salt1',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'jane.smith@example.com',
      stripe_customer_id: 'stripe_cust_02',
      stripe_subscription_id: 'stripe_sub_02',
      paypal_customer_id: 'paypal_cust_02',
      payment_preference: 'paypal',
      passwordHash: 'hashedpassword2',
      passwordSalt: 'salt2',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'alice.johnson@example.com',
      stripe_customer_id: 'stripe_cust_03',
      stripe_subscription_id: 'stripe_sub_03',
      paypal_customer_id: 'paypal_cust_03',
      payment_preference: 'stripe',
      passwordHash: 'hashedpassword3',
      passwordSalt: 'salt3',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'bob.williams@example.com',
      stripe_customer_id: 'stripe_cust_04',
      stripe_subscription_id: 'stripe_sub_04',
      paypal_customer_id: 'paypal_cust_04',
      payment_preference: 'paypal',
      passwordHash: 'hashedpassword4',
      passwordSalt: 'salt4',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
};
