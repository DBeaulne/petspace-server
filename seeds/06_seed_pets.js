/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pet').del();
  
  // Inserts seed entries for pets without the owner_id column
  await knex('pet').insert([
    // John Doe's pets
    {
      id: knex.raw('(UUID())'),
      name: 'Max',
      pet_type: 'Large Dog',
      size: 'Large',
      temperament: 'Playful',
      age: 4,
      food_serving: '3 cups',
      food_type: 'Dry food',
      activities: 'Running, Playing Fetch'
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
      activities: 'Climbing, Exploring'
    },
    // Jane Smith's pets
    {
      id: knex.raw('(UUID())'),
      name: 'Oliver',
      pet_type: 'Indoor Cat',
      size: 'Small',
      temperament: 'Calm',
      age: 3,
      food_serving: '1 cup',
      food_type: 'Dry food',
      activities: 'Sleeping, Climbing'
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
      activities: 'Running, Walking'
    }
  ]);
};
