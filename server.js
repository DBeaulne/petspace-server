/* server.js file */

const express = require("express"); // enable express
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors  = require('cors'); // enable cors
const PORT = process.env.PORT || 8080; // PORT config
require("dotenv").config();

app.use(cors()); // use cors
app.use(express.json()); // enable express to read json responses:
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

/* routes: */
const accountRoutes = require("./routes/accounts-route");
const userRoutes = require("./routes/user-routes");
const sitterRoutes = require("./routes/sitter-routes");
const petRoutes = require("./routes/pet-routes");
const loginRoute = require("./routes/login-route");
const chatRoute = require("./routes/chat-route");
const { default: OpenAI } = require("openai");
app.use("/accounts", accountRoutes);
app.use("/users", userRoutes);
app.use("/sitters", sitterRoutes);
app.use("/pets", petRoutes);
app.use("/login", loginRoute);
app.use("/chat", chatRoute);


// Route for Google Maps API, not sure if I need this yet
// const mapRoute = require("./routes/map-route");
// app.use("/map", mapRoute);

app.listen(PORT, () => {
  console.log('fetching gerbils...');
  console.log('spooling up hamsters....');
  console.log("It's working!! It's working!!!!");  
  console.log(`running at http://localhost:${PORT}`);  
});


