require('dotenv').config()
const express = require("express");
const app = express();
const PORT = 3001;

const exampleRoutes = require("./routes/example");
const authRoutes = require('./routes/auth')

// const jwtMiddleware = require('express-jwt')
// const jwtToken = require('jsonwebtoken')

const venuesRoutes = require('./routes/venues')
const venue_labelsRoutes = require('./routes/venue_labels')
const locationRoutes = require('./routes/locations')
const labelsRoutes = require('./routes/labels')
const happy_hrRoutes = require('./routes/happy_hr')
const galleriesRoutes = require('./routes/galleries')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api", exampleRoutes);
app.use("/api/", venuesRoutes);
app.use("/api/", venue_labelsRoutes);
app.use("/api/", locationRoutes);
app.use("/api/", labelsRoutes);
app.use("/api/",happy_hrRoutes );
app.use("/api/", galleriesRoutes);


app.listen(PORT, () => {
  console.log("running on port 3001");
});
