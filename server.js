// Import des dependances
const express = require("express"); 
// Create a express app
const app = express();
const port = process.env.PORT || 3050
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const db = mongoose.connection
require('dotenv').config();
const cookieParser = require('cookie-parser')

//ROUTES

const NoteRouter= require("./routes/NoteRoute")
const UserRouter=require("./routes/UserRoute")
const requireAuth = require("./middlewares/requireAuth")

app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

db.once("open", () => {
  console.log('[📚Database] MongoDB connected')
})

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/jwt-crud');
}

// API ROUTES
app.use("/", NoteRouter)
app.use('/',UserRouter)


app.listen(port, () => console.log(`[🚀 SERVER 🚀] on port: ${port}`))