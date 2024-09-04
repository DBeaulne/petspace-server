/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sitter_pet_types').del();

  // Inserts seed entries correlating sitters with pet types
  await knex('sitter_pet_types').insert([
    // Alice Johnson - Small Dogs
    {
      sitter_id: await knex('sitters').where('email', 'alice.johnson@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Small Dog').select('id').first().then(row => row.id)
    },
    // Bob Williams - Medium Dogs
    {
      sitter_id: await knex('sitters').where('email', 'bob.williams@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Medium Dog').select('id').first().then(row => row.id)
    },
    // Chris Evans - Large Dogs
    {
      sitter_id: await knex('sitters').where('email', 'chris.evans@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Large Dog').select('id').first().then(row => row.id)
    },
    // Emma Watson - Indoor Cats
    {
      sitter_id: await knex('sitters').where('email', 'emma.watson@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Indoor Cat').select('id').first().then(row => row.id)
    },
    // David Clark - Outdoor Cats
    {
      sitter_id: await knex('sitters').where('email', 'david.clark@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Outdoor Cat').select('id').first().then(row => row.id)
    },
    // Frank Adams - Dogs
    {
      sitter_id: await knex('sitters').where('email', 'frank.adams@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Dogs').select('id').first().then(row => row.id)
    },
    // George Miller - Medium Dogs
    {
      sitter_id: await knex('sitters').where('email', 'george.miller@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Medium Dog').select('id').first().then(row => row.id)
    },
    // Hannah Brown - Large Dogs
    {
      sitter_id: await knex('sitters').where('email', 'hannah.brown@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Large Dog').select('id').first().then(row => row.id)
    },
    // Ian Stone - Reptiles
    {
      sitter_id: await knex('sitters').where('email', 'ian.stone@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Reptiles').select('id').first().then(row => row.id)
    },
    // Julia Roberts - Indoor Cats
    {
      sitter_id: await knex('sitters').where('email', 'julia.roberts@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Indoor Cat').select('id').first().then(row => row.id)
    },
    // Karen Morris - Birds
    {
      sitter_id: await knex('sitters').where('email', 'karen.morris@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Bird').select('id').first().then(row => row.id)
    },
    // Luke Skywalker - Large Dogs
    {
      sitter_id: await knex('sitters').where('email', 'luke.skywalker@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Large Dog').select('id').first().then(row => row.id)
    },
    // Michael Jackson - Small Dogs
    {
      sitter_id: await knex('sitters').where('email', 'michael.jackson@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Small Dog').select('id').first().then(row => row.id)
    },
    // Nancy Drew - Indoor Cats
    {
      sitter_id: await knex('sitters').where('email', 'nancy.drew@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Indoor Cat').select('id').first().then(row => row.id)
    },
    // Oliver Twist - Birds
    {
      sitter_id: await knex('sitters').where('email', 'oliver.twist@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Bird').select('id').first().then(row => row.id)
    },
    // Peter Parker - Dogs and Cats
    {
      sitter_id: await knex('sitters').where('email', 'peter.parker@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Dogs').select('id').first().then(row => row.id)
    },
    {
      sitter_id: await knex('sitters').where('email', 'peter.parker@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Cats').select('id').first().then(row => row.id)
    },
    // Quincy Adams - Medium Dogs
    {
      sitter_id: await knex('sitters').where('email', 'quincy.adams@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Medium Dog').select('id').first().then(row => row.id)
    },
    // Rachel Green - Large Dogs
    {
      sitter_id: await knex('sitters').where('email', 'rachel.green@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Large Dog').select('id').first().then(row => row.id)
    }
  ]);
};
