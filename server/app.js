require("dotenv").config()
const express = require("express")
const jwtMiddleware = require("express-jwt")
const jwtToken = require("jsonwebtoken")
const app = express()
const PORT = 3001
// const exampleRoutes = require("./routes/example");
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const authRoutes = require("./routes/auth")
const adminsRoutes = require("./routes/admins")
// app.use("/api", exampleRoutes)
app.use("/api", adminsRoutes)
app.use("/api", authRoutes)
app.listen(PORT, () => {
  console.log("running on port 3001")
})
