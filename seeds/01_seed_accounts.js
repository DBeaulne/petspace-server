/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('accounts').del();

  // Inserts 20 unique seed entries
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
    },
    {
      id: knex.raw('(UUID())'),
      email: 'chris.evans@example.com',
      stripe_customer_id: 'stripe_cust_05',
      stripe_subscription_id: 'stripe_sub_05',
      paypal_customer_id: 'paypal_cust_05',
      payment_preference: 'stripe',
      passwordHash: 'hashedpassword5',
      passwordSalt: 'salt5',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'david.clark@example.com',
      stripe_customer_id: 'stripe_cust_06',
      stripe_subscription_id: 'stripe_sub_06',
      paypal_customer_id: 'paypal_cust_06',
      payment_preference: 'paypal',
      passwordHash: 'hashedpassword6',
      passwordSalt: 'salt6',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'emma.watson@example.com',
      stripe_customer_id: 'stripe_cust_07',
      stripe_subscription_id: 'stripe_sub_07',
      paypal_customer_id: 'paypal_cust_07',
      payment_preference: 'stripe',
      passwordHash: 'hashedpassword7',
      passwordSalt: 'salt7',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'frank.adams@example.com',
      stripe_customer_id: 'stripe_cust_08',
      stripe_subscription_id: 'stripe_sub_08',
      paypal_customer_id: 'paypal_cust_08',
      payment_preference: 'paypal',
      passwordHash: 'hashedpassword8',
      passwordSalt: 'salt8',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'george.miller@example.com',
      stripe_customer_id: 'stripe_cust_09',
      stripe_subscription_id: 'stripe_sub_09',
      paypal_customer_id: 'paypal_cust_09',
      payment_preference: 'stripe',
      passwordHash: 'hashedpassword9',
      passwordSalt: 'salt9',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'hannah.brown@example.com',
      stripe_customer_id: 'stripe_cust_10',
      stripe_subscription_id: 'stripe_sub_10',
      paypal_customer_id: 'paypal_cust_10',
      payment_preference: 'paypal',
      passwordHash: 'hashedpassword10',
      passwordSalt: 'salt10',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'ian.stone@example.com',
      stripe_customer_id: 'stripe_cust_11',
      stripe_subscription_id: 'stripe_sub_11',
      paypal_customer_id: 'paypal_cust_11',
      payment_preference: 'stripe',
      passwordHash: 'hashedpassword11',
      passwordSalt: 'salt11',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'julia.roberts@example.com',
      stripe_customer_id: 'stripe_cust_12',
      stripe_subscription_id: 'stripe_sub_12',
      paypal_customer_id: 'paypal_cust_12',
      payment_preference: 'paypal',
      passwordHash: 'hashedpassword12',
      passwordSalt: 'salt12',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'karen.morris@example.com',
      stripe_customer_id: 'stripe_cust_13',
      stripe_subscription_id: 'stripe_sub_13',
      paypal_customer_id: 'paypal_cust_13',
      payment_preference: 'stripe',
      passwordHash: 'hashedpassword13',
      passwordSalt: 'salt13',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'luke.skywalker@example.com',
      stripe_customer_id: 'stripe_cust_14',
      stripe_subscription_id: 'stripe_sub_14',
      paypal_customer_id: 'paypal_cust_14',
      payment_preference: 'paypal',
      passwordHash: 'hashedpassword14',
      passwordSalt: 'salt14',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'michael.jackson@example.com',
      stripe_customer_id: 'stripe_cust_15',
      stripe_subscription_id: 'stripe_sub_15',
      paypal_customer_id: 'paypal_cust_15',
      payment_preference: 'stripe',
      passwordHash: 'hashedpassword15',
      passwordSalt: 'salt15',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'nancy.drew@example.com',
      stripe_customer_id: 'stripe_cust_16',
      stripe_subscription_id: 'stripe_sub_16',
      paypal_customer_id: 'paypal_cust_16',
      payment_preference: 'paypal',
      passwordHash: 'hashedpassword16',
      passwordSalt: 'salt16',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'oliver.twist@example.com',
      stripe_customer_id: 'stripe_cust_17',
      stripe_subscription_id: 'stripe_sub_17',
      paypal_customer_id: 'paypal_cust_17',
      payment_preference: 'stripe',
      passwordHash: 'hashedpassword17',
      passwordSalt: 'salt17',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'peter.parker@example.com',
      stripe_customer_id: 'stripe_cust_18',
      stripe_subscription_id: 'stripe_sub_18',
      paypal_customer_id: 'paypal_cust_18',
      payment_preference: 'paypal',
      passwordHash: 'hashedpassword18',
      passwordSalt: 'salt18',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'quincy.adams@example.com',
      stripe_customer_id: 'stripe_cust_19',
      stripe_subscription_id: 'stripe_sub_19',
      paypal_customer_id: 'paypal_cust_19',
      payment_preference: 'stripe',
      passwordHash: 'hashedpassword19',
      passwordSalt: 'salt19',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      email: 'rachel.green@example.com',
      stripe_customer_id: 'stripe_cust_20',
      stripe_subscription_id: 'stripe_sub_20',
      paypal_customer_id: 'paypal_cust_20',
      payment_preference: 'paypal',
      passwordHash: 'hashedpassword20',
      passwordSalt: 'salt20',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
};
