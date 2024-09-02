/* PetSpace database users seed file */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del();
  
  // Inserts seed entries
  await knex('user').insert([
    {
      id: knex.raw('(UUID())'),
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      address: '123 Scugog Street',
      city: 'Uxbridge',
      province: 'ON',
      postal_code: 'L9P 1J3',
      account_id: await knex('account').where('email', 'john.doe@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      address: '456 Brock Street',
      city: 'Whitby',
      province: 'ON',
      postal_code: 'L1N 4J8',
      account_id: await knex('account').where('email', 'jane.smith@example.com').select('id').first().then(row => row.id)
    }
  ]);
};

