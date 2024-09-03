const knex = require("knex")(require("../knexfile"));

// GET list of users
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

module.exports = { sitters }