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
      address: '789 Pine Road',
      city: 'Calgary',
      province: 'AB',
      postal_code: 'T2P 2B5',
      account_id: await knex('account').where('email', 'alice.johnson@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Bob',
      last_name: 'Williams',
      email: 'bob.williams@example.com',
      address: '101 Elm Street',
      city: 'Montreal',
      province: 'QC',
      postal_code: 'H2Y 2Z7',
      account_id: await knex('account').where('email', 'bob.williams@example.com').select('id').first().then(row => row.id)
    }
  ]);
};

