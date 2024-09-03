/* PetSpace database users seed file */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  
  // Inserts seed entries
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
      account_id: await knex('account').where('email', 'john.doe@example.com').select('id').first().then(row => row.id)
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
      account_id: await knex('account').where('email', 'jane.smith@example.com').select('id').first().then(row => row.id)
    }
  ]);
};
