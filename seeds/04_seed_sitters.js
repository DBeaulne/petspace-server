/* PetSpace database sitter seed file */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sitter').del();
  
  // Inserts seed entries
  await knex('sitter').insert([
    {
      id: knex.raw('(UUID())'),
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice.johnson@example.com',
      address: '789 Bayly Street',
      city: 'Pickering',
      province: 'ON',
      postal_code: 'L1W 1M7',
      account_id: await knex('account').where('email', 'alice.johnson@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Bob',
      last_name: 'Williams',
      email: 'bob.williams@example.com',
      address: '101 Wilson Road',
      city: 'Oshawa',
      province: 'ON',
      postal_code: 'L1G 6E8',
      account_id: await knex('account').where('email', 'bob.williams@example.com').select('id').first().then(row => row.id)
    }
  ]);
};

