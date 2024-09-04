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
    // Check if the account with the given email exists in the accounts table
    const acctUserCheck = await knex("accounts").where({ email: req.body.email }).first();
    if (!acctUserCheck) {
      return res.status(400).json({
        message: `Account with email ${req.body.email} not found. Please create the account first.`
      });
    }

    const userCheck = await knex("users").where({email: req.body.email}).first();
    if(userCheck){
      return res.status(400).json({
        message: `A user with the email ${req.body.email} already exists. Please use a different email.`
      });
    }

    // Insert the new user into the users table and retrieve the inserted ID
    const newUserId = await knex("users").insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      province: req.body.province,
      postal_code: req.body.postal_code,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      account_id: acctUserCheck.id  // Ensure account_id is set correctly
    }).returning('id'); // Use 'returning' to get the inserted ID

    // Retrieve and return the newly created user
    const newUser = await knex("users").where({ email: req.body.email }).first();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to add new user to the database: ${error.message}`
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    // check to see if account exists
    const userExists = await knex("users").where({id: req.params.id});
    if(userExists.length === 0){
      return res.status(400).json({
        message: `User with ID ${req.params.id} not found`
      });
    }
    await knex("users").where({id: req.params.id}).del();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve user data for user with ID ${req.params.id}`
    })
  }
};


module.exports = { users, addUser, deleteUser }