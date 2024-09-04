/* PetSpace database user_pet seed file */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_pet').del();

  // Inserts seed entries
  await knex('user_pet').insert([
    // John Doe's pets
    {
      id: 1,
      user_id: await knex('users').where('email', 'john.doe@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Max').select('id').first().then(row => row.id)
    },
    {
      id: 2,
      user_id: await knex('users').where('email', 'john.doe@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Bella').select('id').first().then(row => row.id)
    },
    // Jane Smith's pets
    {
      id: 3,
      user_id: await knex('users').where('email', 'jane.smith@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Oliver').select('id').first().then(row => row.id)
    },
    {
      id: 4,
      user_id: await knex('users').where('email', 'jane.smith@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Charlie').select('id').first().then(row => row.id)
    },
  ]);
};