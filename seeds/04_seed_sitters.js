/* PetSpace database sitter seed file */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('sitters').del();
  
  // Inserts seed entries for 13 sitters (emails adjusted to avoid overlap with users)
  await knex('sitters').insert([
    {
      id: knex.raw('(UUID())'),
      first_name: 'Frank',
      last_name: 'Adams',
      email: 'frank.adams@example.com',
      address: '9 Hiley Ave',
      city: 'Ajax',
      province: 'ON',
      postal_code: 'L1S 6H3',
      latitude: 43.85238519348715,
      longitude: -79.05117427145282,
      availability: true,
      account_id: await knex('accounts').where('email', 'frank.adams@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'George',
      last_name: 'Miller',
      email: 'george.miller@example.com',
      address: '101 Wilson Road N',
      city: 'Oshawa',
      province: 'ON',
      postal_code: 'L1G 6E8',
      latitude: 43.90539892589483,
      longitude: -78.84505390664327,
      availability: false,
      account_id: await knex('accounts').where('email', 'george.miller@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Hannah',
      last_name: 'Brown',
      email: 'hannah.brown@example.com',
      address: '123 Bayly St W',
      city: 'Pickering',
      province: 'ON',
      postal_code: 'L1W 1L7',
      latitude: 43.83933184710908,
      longitude: -79.08996499661614,
      availability: true,
      account_id: await knex('accounts').where('email', 'hannah.brown@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Ian',
      last_name: 'Stone',
      email: 'ian.stone@example.com',
      address: '789 Liverpool Rd',
      city: 'Pickering',
      province: 'ON',
      postal_code: 'L1W 1R1',
      latitude: 43.83530902675527,
      longitude: -79.08483187626552,
      availability: true,
      account_id: await knex('accounts').where('email', 'ian.stone@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Julia',
      last_name: 'Roberts',
      email: 'julia.roberts@example.com',
      address: '456 Simcoe St S',
      city: 'Oshawa',
      province: 'ON',
      postal_code: 'L1H 4J4',
      latitude: 43.88637814295188,
      longitude: -78.86366211570886,
      availability: false,
      account_id: await knex('accounts').where('email', 'julia.roberts@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Karen',
      last_name: 'Morris',
      email: 'karen.morris@example.com',
      address: '1022 Taunton Rd E',
      city: 'Whitby',
      province: 'ON',
      postal_code: 'L1R 3L9',
      latitude: 43.94891233445145,
      longitude: -78.93639184630607,
      availability: true,
      account_id: await knex('accounts').where('email', 'karen.morris@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Luke',
      last_name: 'Skywalker',
      email: 'luke.skywalker@example.com',
      address: '345 Brock St N',
      city: 'Whitby',
      province: 'ON',
      postal_code: 'L1N 4H7',
      latitude: 43.89998885475345,
      longitude: -78.93765484801647,
      availability: true,
      account_id: await knex('accounts').where('email', 'luke.skywalker@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Michael',
      last_name: 'Jackson',
      email: 'michael.jackson@example.com',
      address: '21 Thickson Rd N',
      city: 'Whitby',
      province: 'ON',
      postal_code: 'L1N 8W8',
      latitude: 43.90289844134526,
      longitude: -78.93317384384205,
      availability: true,
      account_id: await knex('accounts').where('email', 'michael.jackson@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Nancy',
      last_name: 'Drew',
      email: 'nancy.drew@example.com',
      address: '789 Taunton Rd W',
      city: 'Oshawa',
      province: 'ON',
      postal_code: 'L1H 7K5',
      latitude: 43.94645611371505,
      longitude: -78.88211174558921,
      availability: true,
      account_id: await knex('accounts').where('email', 'nancy.drew@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Oliver',
      last_name: 'Twist',
      email: 'oliver.twist@example.com',
      address: '562 Glen St',
      city: 'Oshawa',
      province: 'ON',
      postal_code: 'L1J 3E3',
      latitude: 43.87678045634926,
      longitude: -78.86567845341953,
      availability: false,
      account_id: await knex('accounts').where('email', 'oliver.twist@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Peter',
      last_name: 'Parker',
      email: 'peter.parker@example.com',
      address: '42 Conlin Rd',
      city: 'Oshawa',
      province: 'ON',
      postal_code: 'L1G 3W3',
      latitude: 43.94561123176363,
      longitude: -78.86687134028958,
      availability: true,
      account_id: await knex('accounts').where('email', 'peter.parker@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Quincy',
      last_name: 'Adams',
      email: 'quincy.adams@example.com',
      address: '221 Elm St',
      city: 'Whitby',
      province: 'ON',
      postal_code: 'L1N 1Z3',
      latitude: 43.90178856123467,
      longitude: -78.93289239462734,
      availability: true,
      account_id: await knex('accounts').where('email', 'quincy.adams@example.com').select('id').first().then(row => row.id)
    },
    {
      id: knex.raw('(UUID())'),
      first_name: 'Rachel',
      last_name: 'Green',
      email: 'rachel.green@example.com',
      address: '45 Kent St',
      city: 'Whitby',
      province: 'ON',
      postal_code: 'L1N 4Y5',
      latitude: 43.90509998765128,
      longitude: -78.93547866354321,
      availability: true,
      account_id: await knex('accounts').where('email', 'rachel.green@example.com').select('id').first().then(row => row.id)
    }
  ]);
};
