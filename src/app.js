const express = require("express")
const app = express()

// utility
const getZoos = require("./utils/getZoos")

// middleware
const morgan = require("morgan")
const validateZip = require("./middleware/validateZip")


// make three routes:

// /check/:zip to check zip codes. require 5 chars, numbers only, use validateZip.js in middleware
// return message saying where the zip code matches the records

// /zoos/:zip call getZoos(), pass in the zip code from route parameters
// return zoo list separated by semicolons

// /zoos/all require admin query & value set to true. use getZoos() with no arguments



app.use(morgan('dev'))

app.get("/check/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip
  const zipZoos = getZoos(zip)
  const zipMatch = `${zip} exists in our records.`
  const zipNoMatch = `${zip} does not exist in our records.`

  const message = zipZoos ? zipMatch : zipNoMatch

  res.send(message)
})

app.get("/zoos/:zip", validateZip, (req, res) => {
  const zip = req.params.zip
  const zipZoos = getZoos(zip)
  const zooList = `${zip} zoos: ${getZoos(zip).join("; ")}`
  const noZoos = `${zip} has no zoos.`

  const message = zipZoos.length ? zooList : noZoos

  res.send(message)
})

app.get("/zoos/all?admin=true", (req, res) => {
  
  res.send(`All zoos goes here`)
})

// Not-found handler
app.use((req, res, next) => {
  res.send(`That route could not be found!`);
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
})

module.exports = app
