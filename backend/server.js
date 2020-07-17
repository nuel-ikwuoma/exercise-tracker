const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const URI = process.env.ATLAS_URI;

mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .catch(err => console.error("DB Not Connected: ", err))

const connection = mongoose.connection;

connection.once("open", () => console.log("MongoDB Database connection successful"))

const userRouter = require("./routes/users")
const exerciseRouter = require("./routes/exercises")

app.use("/users", userRouter)
app.use("/exercises", exerciseRouter)

app.listen(PORT, () => console.log('STARTED ON PORT: ' + PORT));