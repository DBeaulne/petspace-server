/* server.js file */
// enable express
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors  = require('cors'); // enable cors
const PORT = process.env.PORT || 8080; // PORT config
require("dotenv").config();

app.use(express.json()); // enable express to read json responses:
app.use(cors()); // use cors
app.use(cookieParser());

/* routes: */
const accountRoutes = require("./routes/accounts-route");
const userRoutes = require("./routes/user-routes");
const sitterRoutes = require("./routes/sitter-routes");
const petRoutes = require("./routes/pet-routes");
const loginRoute = require("./routes/login-route");
app.use("/accounts", accountRoutes);
app.use("/users", userRoutes);
app.use("/sitters", sitterRoutes);
app.use("/pets", petRoutes);
app.use("/login", loginRoute);

// Route for Google Maps API, not sure if I need this yet
// const mapRoute = require("./routes/map-route");
// app.use("/map", mapRoute);

app.listen(PORT, () => {
  console.log('fetching gerbils...');
  console.log('spooling up hamsters....');
  console.log('success!!!!');  
  console.log(`running at http://localhost:${PORT}`);  
});


