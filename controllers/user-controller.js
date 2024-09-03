const knex = require("knex")(require("../knexfile"));

// GET list of users
const users = async (req, res) => {
  try {
    const users = await knex("users")
    res.json(users)
  } catch (error) {
    res.status(400).json({
      message: `Unable to retrieve user data: ${error}`
    })
  }
};

module.exports = { users }