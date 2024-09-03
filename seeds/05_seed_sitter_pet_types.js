/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sitter_pet_types').del();
  
  // Inserts seed entries
  await knex('sitter_pet_types').insert([
    {
      sitter_id: await knex('sitters').where('email', 'alice.johnson@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Dogs').select('id').first().then(row => row.id)
    },
    {
      sitter_id: await knex('sitters').where('email', 'alice.johnson@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Reptiles').select('id').first().then(row => row.id)
    },
    {
      sitter_id: await knex('sitters').where('email', 'bob.williams@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Large Dogs').select('id').first().then(row => row.id)
    },
    {
      sitter_id: await knex('sitters').where('email', 'bob.williams@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Cats').select('id').first().then(row => row.id)
    }
  ]);
};
