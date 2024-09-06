const jwt = require("jsonwebtoken");

function generateRefreshToken(user) {
  
  // generate jwt token
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '69d'});
}

module.exports = generateRefreshToken;