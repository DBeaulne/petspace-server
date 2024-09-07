const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");

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

// GET account by email accounts/:email
const acctByEmail = async (req, res) => {
  try {
    const acctFound = await knex("accounts").where({email: req.params.email});

    if(acctFound.length === 0){
      return res.status(404).json({
        message: `Account with email ${req.params.email} not found`
      });
    }
    const acctData = acctFound[0];
    res.json(acctData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve account data by email: ${req.params.email}`
    })
  }

}

const addAcct = async (req, res) => {
  const { firstName, lastName, email, city, address, province, postalCode, password } = req.body;
  try {
    // check if an account with matching email already exists
    const existingAcct = await knex("accounts").where({ email }).first();

    if(existingAcct) {
      return res.status(400).json({
        message: `Account with email ${req.body.email} already exits`
      })
    }

    // if no account exists, create one in the accounts table
     const hashedPassword = await bcrypt.hash(req.body.password, 10);
     const [accountId] = await knex("accounts").insert({
      email,
      passwordHash: hashedPassword,
      passwordSalt: "salty72345$*@#1"
    });
    const newAcctData = await knex("accounts").where({email}).first();
    
    await knex("users").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      address,
      city,
      province,
      postal_code: postalCode,
      account_id: newAcctData.id,
    });

    // confirm that a new account was created:
    res.status(201).json({
      message: "User registered successfully",
      user: { firstName, lastName, email }
    });
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

module.exports = { accts, acctByEmail, addAcct, deleteAcct }