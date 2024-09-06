const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");

// POST log-in user
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = email;
  const userPassword = password;
  try {
    // get the account with matching email
    const acctExists = await knex("accounts").where({email: user}).first();

    if(!acctExists){ // check that account exists, if not, return message
      return res.status(404).json({
        message: `Account with email ${user} does not exist`
      });
    }
    
    if(await bcrypt.compare(userPassword, acctExists.passwordHash)){ // compare password to hashed password stored in db
      const aToken = generateAccessToken({user: user});  // if compare passed, generate an access token
      const rToken = generateRefreshToken({user: user}); // generate a refresh token
      return res.json({accessToken: aToken, refreshToken: rToken});            // return token to user
    } else {
      console.log("Password incorrect");      // if compare failed
      return res.status(403).json({           // return code and message that password is incorrect
        message: `Incorrect Password`
      })
    }
  } catch (error) {
    res.status(500).json({      // all other errors generate code 500
      message: `Unable to log-in user with email: ${user}`
    })
  }
}


module.exports = { login }