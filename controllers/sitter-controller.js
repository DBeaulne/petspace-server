const knex = require("knex")(require("../knexfile"));

// GET list of sitters
const sitters = async (req, res) => {
  try {
    const sitters = await knex("sitters")
    res.json(sitters)
  } catch (error) {
    res.status(400).json({
      message: `Unable to retrieve sitters data: ${error}`
    })
  }
};

const addSitter = async (req,res) => {
  res.status(500).json({
    message: `Currently unable to add sitters. Check back later`
  })
};

const findSitters = async (req, res) => {
  const { petType, userLat, userLng } = req.body;

  try {
    // Query sitters based on pet type, availability, and calculate distance
    const sitters = await knex('sitters')
      .join('sitter_pet_types', 'sitters.id', '=', 'sitter_pet_types.sitter_id')
      .join('pet_types', 'sitter_pet_types.pet_type_id', '=', 'pet_types.id')
      .select(
        'sitters.*',
        knex.raw(
          '( 3959 * acos( cos( radians(?) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(?) ) + sin( radians(?) ) * sin( radians( lat ) ) ) ) AS distance',
          [userLat, userLng, userLat]
        )
      )
      .where('availability', true)
      .andWhere('pet_types.name', petType)
      .orderBy('distance', 'asc');

    res.json(sitters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sitters, addSitter, findSitters }