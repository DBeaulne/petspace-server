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
    // Alice Johnson's pet
    {
      id: 5,
      user_id: await knex('users').where('email', 'alice.johnson@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Lucy').select('id').first().then(row => row.id)
    },
    // Bob Williams' pet
    {
      id: 6,
      user_id: await knex('users').where('email', 'bob.williams@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Daisy').select('id').first().then(row => row.id)
    },
    // Chris Evans' pet
    {
      id: 7,
      user_id: await knex('users').where('email', 'chris.evans@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Coco').select('id').first().then(row => row.id)
    },
    // Emma Watson's pet
    {
      id: 8,
      user_id: await knex('users').where('email', 'emma.watson@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Milo').select('id').first().then(row => row.id)
    },
    // David Clark's pets
    {
      id: 9,
      user_id: await knex('users').where('email', 'david.clark@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Spike').select('id').first().then(row => row.id)
    },
    {
      id: 10,
      user_id: await knex('users').where('email', 'david.clark@example.com').select('account_id').first().then(row => row.account_id),
      pet_id: await knex('pet').where('name', 'Simba').select('id').first().then(row => row.id)
    }
  ]);
};
