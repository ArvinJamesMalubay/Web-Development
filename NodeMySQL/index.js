const express = require("express")
const app = express()

require('dotenv').config()

const studRouter = require('./routes/stud.router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/students", studRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server running......")
})
