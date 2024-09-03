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
    {
      id: 1,
      user_id: await knex('user').where('email', 'john.doe@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Buddy').select('id').first().then(row => row.id)
    },
    {
      id: 2,
      user_id: await knex('user').where('email', 'jane.smith@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Whiskers').select('id').first().then(row => row.id)
    }
  ]);
};
