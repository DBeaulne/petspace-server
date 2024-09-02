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
      address: '123 Maple Street',
      city: 'Toronto',
      province: 'ON',
      postal_code: 'M4B 1B3',
      account_id: await knex('account').where('email', 'john.doe@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      address: '456 Oak Avenue',
      city: 'Vancouver',
      province: 'BC',
      postal_code: 'V5K 0A1',
      account_id: await knex('account').where('email', 'jane.smith@example.com').select('id').first().then(row => row.id)
    }
  ]);
};
