/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sitter_pet_types').del();

  // Inserts seed entries correlating sitters with pet types
  await knex('sitter_pet_types').insert([
    // Frank Adams - willing to watch Small Dogs and Indoor Cats
    {
      sitter_id: await knex('sitters').where('email', 'frank.adams@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Small Dog').select('id').first().then(row => row.id)
    },
    {
      sitter_id: await knex('sitters').where('email', 'frank.adams@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Indoor Cat').select('id').first().then(row => row.id)
    },
    // George Miller - willing to watch Medium Dogs and Outdoor Cats
    {
      sitter_id: await knex('sitters').where('email', 'george.miller@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Medium Dog').select('id').first().then(row => row.id)
    },
    {
      sitter_id: await knex('sitters').where('email', 'george.miller@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Outdoor Cat').select('id').first().then(row => row.id)
    },
    // Hannah Brown - willing to watch Large Dogs
    {
      sitter_id: await knex('sitters').where('email', 'hannah.brown@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Large Dog').select('id').first().then(row => row.id)
    },
    // Ian Stone - willing to watch Reptiles and Tarantulas
    {
      sitter_id: await knex('sitters').where('email', 'ian.stone@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Reptiles').select('id').first().then(row => row.id)
    },
    {
      sitter_id: await knex('sitters').where('email', 'ian.stone@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Tarantula').select('id').first().then(row => row.id)
    },
    // Julia Roberts - willing to watch Indoor Cats
    {
      sitter_id: await knex('sitters').where('email', 'julia.roberts@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Indoor Cat').select('id').first().then(row => row.id)
    },
    // Karen Morris - willing to watch Birds and Medium Dogs
    {
      sitter_id: await knex('sitters').where('email', 'karen.morris@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Bird').select('id').first().then(row => row.id)
    },
    {
      sitter_id: await knex('sitters').where('email', 'karen.morris@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Medium Dog').select('id').first().then(row => row.id)
    },
    // Luke Skywalker - willing to watch Large Dogs
    {
      sitter_id: await knex('sitters').where('email', 'luke.skywalker@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Large Dog').select('id').first().then(row => row.id)
    },
    // Michael Jackson - willing to watch Small Dogs
    {
      sitter_id: await knex('sitters').where('email', 'michael.jackson@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Small Dog').select('id').first().then(row => row.id)
    },
    // Nancy Drew - willing to watch Indoor Cats
    {
      sitter_id: await knex('sitters').where('email', 'nancy.drew@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Indoor Cat').select('id').first().then(row => row.id)
    },
    // Oliver Twist - willing to watch Birds
    {
      sitter_id: await knex('sitters').where('email', 'oliver.twist@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Bird').select('id').first().then(row => row.id)
    },
    // Peter Parker - willing to watch Dogs and Cats
    {
      sitter_id: await knex('sitters').where('email', 'peter.parker@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Dogs').select('id').first().then(row => row.id)
    },
    {
      sitter_id: await knex('sitters').where('email', 'peter.parker@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Cats').select('id').first().then(row => row.id)
    },
    // Quincy Adams - willing to watch Medium Dogs
    {
      sitter_id: await knex('sitters').where('email', 'quincy.adams@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Medium Dog').select('id').first().then(row => row.id)
    },
    // Rachel Green - willing to watch Large Dogs
    {
      sitter_id: await knex('sitters').where('email', 'rachel.green@example.com').select('id').first().then(row => row.id),
      pet_type_id: await knex('pet_types').where('name', 'Large Dog').select('id').first().then(row => row.id)
    }
  ]);
};
