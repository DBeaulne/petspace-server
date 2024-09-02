/* PetSpace database account seed file */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('account').del();
  
  // Inserts seed entries
  await knex('account').insert([
    {
      id: knex.raw('(UUID())'),
      email: 'john.doe@example.com',
      stripe_customer_id: 'stripe_cust_01',
      stripe_subscription_id: 'stripe_sub_01',
      paypal_customer_id: 'paypal_cust_01',
      payment_preference: 'stripe',
      passwordHash: 'hashedpassword1',
      passwordSalt: 'salt1'
    },
    {
      id: knex.raw('(UUID())'),
      email: 'jane.smith@example.com',
      stripe_customer_id: 'stripe_cust_02',
      stripe_subscription_id: 'stripe_sub_02',
      paypal_customer_id: 'paypal_cust_02',
      payment_preference: 'paypal',
      passwordHash: 'hashedpassword2',
      passwordSalt: 'salt2'
    }
  ]);
};
