/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pet').del();
  
  // Inserts seed entries
  await knex('pet').insert([
    {
      id: knex.raw('(UUID())'),
      name: 'Buddy',
      pet_type: 'Dog',
      size: 'Medium',
      temperament: 'Friendly',
      age: 3,
      food_serving: '2 cups',
      food_type: 'Dry food',
      activities: 'Running, Fetch',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      id: knex.raw('(UUID())'),
      name: 'Whiskers',
      pet_type: 'Cat',
      size: 'Small',
      temperament: 'Calm',
      age: 5,
      food_serving: '1 cup',
      food_type: 'Wet food',
      activities: 'Sleeping, Climbing',
      date_created: knex.fn.now(),
      updated_at: knex.fn.now()
    }
  ]);
};
