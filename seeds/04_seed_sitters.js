/* PetSpace database sitter seed file */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sitters').del();
  
  // Inserts seed entries
  await knex('sitters').insert([
    {
      id: knex.raw('(UUID())'),
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice.johnson@example.com',
      address: '9 Hiley Ave',
      city: 'Ajax',
      province: 'ON',
      postal_code: 'L1S 6H3',
      latitude: 43.85238519348715,
      longitude: -79.05117427145282,
      availability: true,
      date_created: knex.fn.now(),
      updated_at: knex.fn.now(),
      account_id: await knex('accounts').where('email', 'alice.johnson@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Bob',
      last_name: 'Williams',
      email: 'bob.williams@example.com',
      address: '101 Wilson Road N',
      city: 'Oshawa',
      province: 'ON',
      postal_code: 'L1G 6E8',
      latitude: 43.90539892589483,
      longitude: -78.84505390664327,
      availability: false,
      date_created: knex.fn.now(),
      updated_at: knex.fn.now(),
      account_id: await knex('accounts').where('email', 'bob.williams@example.com').select('id').first().then(row => row.id)
    }
  ]);
};
