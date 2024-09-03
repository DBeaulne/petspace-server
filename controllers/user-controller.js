const knex = require("knex")(require("../knexfile"));

// GET list of users
const users = async (req, res) => {
  try {
    const users = await knex("users");
    res.json(users)
  } catch (error) {
    res.status(400).json({
      message: `Unable to retrieve user data: ${error}`
    })
  }
};

const addUser = async (req, res) => {
  try {
    // check accounts to see if user email exists and return the id of that user
    const acctUserCheck = await knex("accounts").where({email: req.params.email});
    if(acctUserCheck.length === 0){
      return res.status(400).json({
        message: `Account with email ${req.params.id} not found. Create account first`
      });
    }
    
    // insert the new user data in the table
    const result = await knex("users").insert(req.body);
    const newUser = await knex("users").where({id: result[0] }).first();
    
    // confirm that a new user was created:
    res.status(201).json(newUser);
  } catch (error) {
    // error message:
    res.status(500).json({message: `Unable to add new user to the database: ${error.message}`})
  }
};

module.exports = { users, addUser }