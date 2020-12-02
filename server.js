const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const app = express()
const PORT = process.env.PORT || 3600

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// ASSETS
if (process.env.NOD_ENV === "production") {
    app.use(express.static("client/build"))
}
// ROUTES
app.use(routes)
// DATABASE
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/diophantineTable")
// SERVER
app.listen(PORT, () => {
    console.log(`API Server now listening on PORT ${PORT}...`)
})