const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");

// POST log-in user
const login = async (req, res) => {
  const { email, password } = req.body;
  const userEmail = email;
  const userPassword = password;
  try {
    // get the account with matching email
    const acctExists = await knex("accounts").where({email: userEmail}).first();
    
    if(!acctExists){
      return res.status(404).json({
        message: `Account with email ${userEmail} does not exist`
      });
    }
    if(await bcrypt.compare(userPassword, acctExists.passwordHash)){
      return res.status(200).json({
        message: `User is logged in!`
      })
    } else {
      console.log("Password incorrect");
      return res.status(403).json({
        message: `Incorrect Password`
      })
    }
  } catch (error) {
    res.status(500).json({
      message: `Unable to log-in user with email: ${userEmail}`
    })
  }
}


module.exports = { login }