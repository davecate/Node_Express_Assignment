const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(morgan('dev'))

// make three routes:

// /check/:zip to check zip codes. require 5 chars, numbers only, use validateZip.js in middleware
// return message saying where the zip code matches the records

// /zoos/:zip call getZoos(), pass in the zip code from route parameters
// return zoo list separated by semicolons

// /zoos/all require admin query & value set to true. use getZoos() with no arguments

app.get("/check/:zip", (req, res) => {
    const zip = req.params.zip
    res.send(`Zip checker for ${zip} goes here`)
})

app.get("/zoos/:zip", (req, res) => {
    const zip = req.params.zip
    res.send(`Zoos for ${zip} goes here`)
})

app.get("/zoos/all", (req, res) => {
    res.send(`All zoos goes here`)
})

module.exports = app
