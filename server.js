const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require("express-jwt");

const PORT = process.env.PORT || 7000;

const app = express();
require("dotenv").config();

// Middlewares for every request
app.use(express.json())
app.use(morgan('dev'))

app.use("/auth", require("./routes/auth"));

// Make the app use the express-jwt authentication middleware on anything starting with "/api"
app.use("/api", expressJwt({secret: process.env.SECRET}));

// Middlewares for every request
mongoose.connect("mongodb://localhost:27017/attache", {useNewUrlParser: true}, () => {
    console.log("[o] Connected to the DB")
})

// Routes
app.use('/api/user/v1', require('./routes/userRoutes.js'))
app.use('/api/category/v1', require('./routes/categoryRoutes.js'))
app.use('/api/portfolio/v1', require('./routes/portfolioRoutes.js'))


// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    if (err.name === "UnauthorizedError") {
        // express-jwt gives the 401 status to the err object for us
        res.status(err.status);
    }    
    return res.send({errMsg: err.message})
})

// Server
app.listen(PORT, () => {
    console.log(`[+] Server is running on port ${PORT}` )
})