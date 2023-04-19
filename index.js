const express = require("express")
const route = require("./src/routes/route.js")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://priyanka912066:Pie5MEDyx8B1zOiq@cluster0.ucnslwp.mongodb.net/ToDoListDatabase",
    { useNewUrlParser: true })
    .then(() => console.log(("Mongoose is connected")))
    .catch(err => console.log(err.message))

app.use("/api", route)

app.listen(process.env.PORT || 3001, function () {
    console.log("Express is running on port " + (process.env.PORT || 3001))
})



