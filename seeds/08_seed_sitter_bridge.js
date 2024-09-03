/* PetSpace database sitter_bridge seed file */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sitter_bridge').del();
  
  // Inserts seed entries
  await knex('sitter_bridge').insert([
    {
      id: 1,
      sitter_id: await knex('sitters').where('email', 'alice.johnson@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Buddy').select('id').first().then(row => row.id)
    },
    {
      id: 2,
      sitter_id: await knex('sitters').where('email', 'bob.williams@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Whiskers').select('id').first().then(row => row.id)
    }
  ]);
};
