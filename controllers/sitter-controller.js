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
  const {petType, userLat, userLng} = req.body;

  try {
    const query = `
      SELECT *, ( 3959 * acos( cos( radians(?) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(?) ) + sin( radians(?) ) * sin( radians( lat ) ) ) ) AS distance 
      FROM sitters 
      WHERE FIND_IN_SET(?, pet_types) 
      HAVING distance < max_distance
      ORDER BY distance ASC;
    `;

    db.query(query, [userLat, userLng, userLat, petType], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
    res.json(results);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sitters, addSitter, findSitters }