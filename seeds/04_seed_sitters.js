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
      address: '9 Hiley Ave',
      city: 'Ajax',
      province: 'ON',
      postal_code: 'L1S 6H3',
      latitude: 43.85238519348715,  // Latitude for Ajax, ON
      longitude: -79.05117427145282,  // Longitude for Ajax, ON
      availability: true,  // Added availability
      pet_care_type: 'Love dogs and reptiles, but I am allergic to cats',  // Added pet care type
      account_id: await knex('account').where('email', 'alice.johnson@example.com').select('id').first().then(row => row.id)
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
      latitude: 43.90539892589483,  // Latitude for Oshawa, ON
      longitude: -78.84505390664327,  // Longitude for Oshawa, ON
      availability: false,  // Added availability
      pet_care_type: 'Comfortable with all animals, specializing in large dogs',  // Added pet care type
      account_id: await knex('account').where('email', 'bob.williams@example.com').select('id').first().then(row => row.id)
    }
  ]);
};
