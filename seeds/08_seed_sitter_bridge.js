/* PetSpace database sitter_bridge seed file */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sitter_bridge').del();
  
  // Inserts seed entries (past occurrences of sitters watching pets)
  await knex('sitter_bridge').insert([
    // Frank Adams - has watched 'Max' (Large Dog)
    {
      id: 1,
      sitter_id: await knex('sitters').where('email', 'frank.adams@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Max').select('id').first().then(row => row.id)
    },
    // George Miller - has watched 'Bella' (Outdoor Cat)
    {
      id: 2,
      sitter_id: await knex('sitters').where('email', 'george.miller@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Bella').select('id').first().then(row => row.id)
    },
    // Hannah Brown - has watched 'Oliver' (Indoor Cat)
    {
      id: 3,
      sitter_id: await knex('sitters').where('email', 'hannah.brown@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Oliver').select('id').first().then(row => row.id)
    },
    // Ian Stone - has watched 'Charlie' (Medium Dog)
    {
      id: 4,
      sitter_id: await knex('sitters').where('email', 'ian.stone@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Charlie').select('id').first().then(row => row.id)
    }
  ]);
};
