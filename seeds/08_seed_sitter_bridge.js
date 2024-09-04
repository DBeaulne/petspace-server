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
    // Frank Adams - has watched 'Lucy' (Small Dog)
    {
      id: 1,
      sitter_id: await knex('sitters').where('email', 'frank.adams@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Lucy').select('id').first().then(row => row.id)
    },
    // George Miller - has watched 'Daisy' (Medium Dog)
    {
      id: 2,
      sitter_id: await knex('sitters').where('email', 'george.miller@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Daisy').select('id').first().then(row => row.id)
    },
    // Hannah Brown - has watched 'Max' (Large Dog)
    {
      id: 3,
      sitter_id: await knex('sitters').where('email', 'hannah.brown@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Max').select('id').first().then(row => row.id)
    },
    // Ian Stone - has watched 'Spike' (Reptile)
    {
      id: 4,
      sitter_id: await knex('sitters').where('email', 'ian.stone@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Spike').select('id').first().then(row => row.id)
    },
    // Julia Roberts - has watched 'Oliver' (Indoor Cat)
    {
      id: 5,
      sitter_id: await knex('sitters').where('email', 'julia.roberts@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Oliver').select('id').first().then(row => row.id)
    },
    // Karen Morris - has watched 'Milo' (Bird)
    {
      id: 6,
      sitter_id: await knex('sitters').where('email', 'karen.morris@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Milo').select('id').first().then(row => row.id)
    },
    // Luke Skywalker - has watched 'Coco' (Large Dog)
    {
      id: 7,
      sitter_id: await knex('sitters').where('email', 'luke.skywalker@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Coco').select('id').first().then(row => row.id)
    },
    // Michael Jackson - has watched 'Simba' (Outdoor Cat)
    {
      id: 8,
      sitter_id: await knex('sitters').where('email', 'michael.jackson@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Simba').select('id').first().then(row => row.id)
    },
    // Peter Parker - has watched 'Charlie' (Medium Dog)
    {
      id: 9,
      sitter_id: await knex('sitters').where('email', 'peter.parker@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Charlie').select('id').first().then(row => row.id)
    }
  ]);
};
