/* server.js file */
// enable express
const express = require("express");
const app = express();
// enable cors
const cors  = require('cors');
// PORT config
const PORT = process.env.PORT || 8080;
require("dotenv").config();

// enable express to read json responses:
app.use(express.json());
// use cors
app.use(cors());

/* routes: */
const userRoutes = require("./routes/user-routes");
const sitterRoutes = require("./routes/sitter-routes");
const petRoutes = require("./routes/pet-routes");
app.use("/users", userRoutes);
app.use("/sitters", sitterRoutes);
app.use("/pets", petRoutes);

// Route for Google Maps API, not sure if I need this yet
// const mapRoute = require("./routes/map-route");
// app.use("/map", mapRoute);

app.listen(PORT, () => {
  console.log('fetching gerbils...');
  console.log('spooling up hamsters....');
  console.log('success!!!!');  
  console.log(`running at http://localhost:${PORT}`);  
});


