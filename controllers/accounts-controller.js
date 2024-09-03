const knex = require("knex")(require("../knexfile"));


// GET list of accounts
const accts = async (req, res) => {
  try {
    const accounts = await knex("accounts");
    res.json(accounts)
  } catch (error) {
    res.status(400).json({
      message: `Unable to retrieve accounts data: ${error}`
    });
  }
};

const addAcct = async (req, res) => {
  try {
    // insert a new account into the table 'accounts'
    const result = await knex("accounts").insert(req.body);
    const newAccount = await knex("accounts").where({email: req.body.email}).first();

    // confirm that a new account was created:
    res.status(201).json(newAccount);
  } catch (error) {
    // error message:
    res.status(500).json({message: `Unable to add the new account to the database: ${error}`})
  }
};

const deleteAcct = async (req, res) => {
  try {
    // check to see if account exists
    const acctExists = await knex("accounts").where({id: req.params.id});
    if(acctExists.length === 0){
      return res.status(400).json({
        message: `Account with ID ${req.params.id} not found`
      });
    }
    await knex("accounts").where({id: req.params.id}).del();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve account data for account with ID ${req.params.id}`
    })
  }
};

module.exports = { accts, addAcct, deleteAcct }