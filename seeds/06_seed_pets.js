/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pet').del();
  
  // Inserts seed entries for pets, ensuring they correspond only to users from the 03_seed_users.js file
  await knex('pet').insert([
    // Pets for John Doe
    {
      id: knex.raw('(UUID())'),
      name: 'Max',
      pet_type: 'Large Dog',
      size: 'Large',
      temperament: 'Playful',
      age: 4,
      food_serving: '3 cups',
      food_type: 'Dry food',
      activities: 'Running, Playing Fetch',
      owner_id: await knex('users').where('email', 'john.doe@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      name: 'Bella',
      pet_type: 'Outdoor Cat',
      size: 'Small',
      temperament: 'Curious',
      age: 2,
      food_serving: '1 cup',
      food_type: 'Wet food',
      activities: 'Climbing, Exploring',
      owner_id: await knex('users').where('email', 'john.doe@example.com').select('id').first().then(row => row.id)
    },
    // Pets for Jane Smith
    {
      id: knex.raw('(UUID())'),
      name: 'Oliver',
      pet_type: 'Indoor Cat',
      size: 'Small',
      temperament: 'Calm',
      age: 3,
      food_serving: '1 cup',
      food_type: 'Dry food',
      activities: 'Sleeping, Climbing',
      owner_id: await knex('users').where('email', 'jane.smith@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      name: 'Charlie',
      pet_type: 'Medium Dog',
      size: 'Medium',
      temperament: 'Friendly',
      age: 5,
      food_serving: '2 cups',
      food_type: 'Dry food',
      activities: 'Running, Walking',
      owner_id: await knex('users').where('email', 'jane.smith@example.com').select('id').first().then(row => row.id)
    },
    // Pets for Alice Johnson
    {
      id: knex.raw('(UUID())'),
      name: 'Lucy',
      pet_type: 'Small Dog',
      size: 'Small',
      temperament: 'Energetic',
      age: 1,
      food_serving: '1 cup',
      food_type: 'Dry food',
      activities: 'Running, Playing',
      owner_id: await knex('users').where('email', 'alice.johnson@example.com').select('id').first().then(row => row.id)
    },
    // Pets for Bob Williams
    {
      id: knex.raw('(UUID())'),
      name: 'Daisy',
      pet_type: 'Medium Dog',
      size: 'Medium',
      temperament: 'Calm',
      age: 6,
      food_serving: '2 cups',
      food_type: 'Dry food',
      activities: 'Walking, Relaxing',
      owner_id: await knex('users').where('email', 'bob.williams@example.com').select('id').first().then(row => row.id)
    },
    // Pets for Chris Evans
    {
      id: knex.raw('(UUID())'),
      name: 'Coco',
      pet_type: 'Large Dog',
      size: 'Large',
      temperament: 'Playful',
      age: 3,
      food_serving: '3 cups',
      food_type: 'Dry food',
      activities: 'Running, Fetch',
      owner_id: await knex('users').where('email', 'chris.evans@example.com').select('id').first().then(row => row.id)
    },
    // Pets for Emma Watson
    {
      id: knex.raw('(UUID())'),
      name: 'Milo',
      pet_type: 'Bird',
      size: 'Small',
      temperament: 'Chirpy',
      age: 2,
      food_serving: 'Half cup',
      food_type: 'Seeds',
      activities: 'Flying, Singing',
      owner_id: await knex('users').where('email', 'emma.watson@example.com').select('id').first().then(row => row.id)
    },
    // Pets for David Clark
    {
      id: knex.raw('(UUID())'),
      name: 'Spike',
      pet_type: 'Reptiles',
      size: 'Small',
      temperament: 'Calm',
      age: 4,
      food_serving: 'Few insects',
      food_type: 'Insects',
      activities: 'Basking',
      owner_id: await knex('users').where('email', 'david.clark@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      name: 'Simba',
      pet_type: 'Outdoor Cat',
      size: 'Small',
      temperament: 'Curious',
      age: 3,
      food_serving: '1 cup',
      food_type: 'Wet food',
      activities: 'Climbing, Exploring',
      owner_id: await knex('users').where('email', 'david.clark@example.com').select('id').first().then(row => row.id)
    }
  ]);
};
