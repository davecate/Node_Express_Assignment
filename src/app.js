const express = require("express")
const app = express()

// utility
const getZoos = require("./utils/getZoos")

// middleware
const morgan = require("morgan")
const validateZip = require("./middleware/validateZip")

app.use(morgan('dev'))

// zoos/all
app.get("/zoos/all", (req, res) => {
  const isAdmin = req.query.admin
  const allZoos = getZoos()
  const zooList = `All zoos: ${allZoos.join("; ")}`
  const noAccess = `You do not have access to that route.`
  
  const message = isAdmin === "true" ? zooList : noAccess

  res.send(message)
})

// /check/:zip
app.get("/check/:zip", validateZip, (req, res) => {
  const zip = req.params.zip
  const zipZoos = getZoos(zip)
  const zipMatch = `${zip} exists in our records.`
  const zipNoMatch = `${zip} does not exist in our records.`

  const message = zipZoos ? zipMatch : zipNoMatch

  res.send(message)
})

// zoos/:zip
app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip
  if (zip == "all") next()
  const zipZoos = getZoos(zip)
  const zooList = `${zip} zoos: ${getZoos(zip).join("; ")}`
  const noZoos = `${zip} has no zoos.`

  const message = zipZoos.length ? zooList : noZoos

  res.send(message)
})

// Not-found handler
app.use((req, res, next) => {
  res.send(`That route could not be found!`)
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.send(err)
})

module.exports = app
