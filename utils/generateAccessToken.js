const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  
  // generate jwt token
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60d'});
}

module.exports = generateAccessToken;