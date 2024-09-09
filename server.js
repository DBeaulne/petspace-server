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

app.use("/accounts", accountRoutes);
app.use("/users", userRoutes);
app.use("/sitters", sitterRoutes);
app.use("/pets", petRoutes);
app.use("/login", loginRoute);


app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);  
});


