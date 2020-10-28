require('dotenv').config()
console.log(process.env.USERNAME || process)

const express = require("express");
const jwtMiddleware = require('express-jwt')
const jwtToken = require('jsonwebtoken')
const app = express();
const PORT = 3001;
const exampleRoutes = require("./routes/example");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const authRoutes = require('./routes/auth')
app.use("/api", exampleRoutes);
app.listen(PORT, () => {
  console.log("running on port 3001");
});
