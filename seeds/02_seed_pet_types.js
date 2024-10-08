/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pet_types').del();
  
  // Inserts seed entries
  await knex('pet_types').insert([
    { name: 'Dogs' },
    { name: 'Reptiles' },
    { name: 'Cats' },
    { name: 'Large Dog' },
    { name: 'Medium Dog' },
    { name: 'Small Dog' },
    { name: 'Outdoor Cat' },
    { name: 'Indoor Cat' },
    { name: 'Tarantula'},
    { name: 'Bird'}
  ]);
};
