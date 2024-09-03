const knex = require("knex")(require("../knexfile"));

// GET list of users
const pets = async (req, res) => {
  try {
    const pets = await knex("pet")
    res.json(pets)
  } catch (error) {
    res.status(400).json({
      message: `Unable to retrieve pets data: ${error}`
    })
  }
};

module.exports = { pets }