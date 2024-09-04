/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries for 7 unique users
  await knex('users').insert([
    {
      id: knex.raw('(UUID())'),
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      address: '57 Nathan Ave',
      city: 'Whitby',
      province: 'ON',
      postal_code: 'L1M 0K2',
      latitude: 43.96136088294837,  // Latitude for Uxbridge, ON
      longitude: -78.95434641985815,  // Longitude for Uxbridge, ON
      account_id: await knex('accounts').where('email', 'john.doe@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      address: '41 Pilkington Crescent',
      city: 'Whitby',
      province: 'ON',
      postal_code: 'L1N 6E8',
      latitude: 43.89210742117633,  // Latitude for Whitby, ON
      longitude: -78.94130625712823,  // Longitude for Whitby, ON
      account_id: await knex('accounts').where('email', 'jane.smith@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice.johnson@example.com',
      address: '789 Brock St, Pickering, ON',
      city: 'Pickering',
      province: 'Ontario',
      postal_code: 'L1W 3J6',
      latitude: 43.830056,
      longitude: -79.084944,
      account_id: await knex('accounts').where('email', 'alice.johnson@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Bob',
      last_name: 'Williams',
      email: 'bob.williams@example.com',
      address: '321 Bayly St, Oshawa, ON',
      city: 'Oshawa',
      province: 'Ontario',
      postal_code: 'L1H 2V5',
      latitude: 43.900623,
      longitude: -78.861071,
      account_id: await knex('accounts').where('email', 'bob.williams@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Chris',
      last_name: 'Evans',
      email: 'chris.evans@example.com',
      address: '987 Simcoe St, Clarington, ON',
      city: 'Clarington',
      province: 'Ontario',
      postal_code: 'L1C 3Y1',
      latitude: 43.912689,
      longitude: -78.667593,
      account_id: await knex('accounts').where('email', 'chris.evans@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Emma',
      last_name: 'Watson',
      email: 'emma.watson@example.com',
      address: '654 Liberty St, Bowmanville, ON',
      city: 'Bowmanville',
      province: 'Ontario',
      postal_code: 'L1C 4Y7',
      latitude: 43.905000,
      longitude: -78.688888,
      account_id: await knex('accounts').where('email', 'emma.watson@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'David',
      last_name: 'Clark',
      email: 'david.clark@example.com',
      address: '112 Baldwin St, Whitby, ON',
      city: 'Whitby',
      province: 'Ontario',
      postal_code: 'L1N 1C2',
      latitude: 43.892379,
      longitude: -78.938256,
      account_id: await knex('accounts').where('email', 'david.clark@example.com').select('id').first().then(row => row.id)
    }
  ]);
};
