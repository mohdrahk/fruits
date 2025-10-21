//  Loading  Modules

const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB")
})

//import fruit
const Fruit = require("./models/Fruit.js")

// Middleware parses incoming request bodies, extracting form data and converting it into a JavaScript object
// It allows our express app to recieve data from the browser
app.use(express.urlencoded({ extended: false }))

//Routes
app.get("/", async (req, res) => {
  res.render("index.ejs")
})

app.get("/fruits/new", (req, res) => {
  res.render("new.ejs")
})

//Controller Function
app.post("/fruits", async (req, res) => {
  //Because we used a checkbox
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.create(req.body)
  res.redirect("/fruits/new")
  console.log(req.body)
})

//Listening port
app.listen(3000, () => {
  console.log("Listening on port 3000")
})
