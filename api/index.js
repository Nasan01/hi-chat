const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")

const connectDB = require("./config/db")

const userRoute = require("./routes/userRoute")

const app = express()

const PORT = process.env.PORT || 5000

// database connection 
connectDB()

// middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "public")))


app.use("/", (req, res) => {
  res.json({ msg: "hello" })
})

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`hi-chat API Backend Running On PORT ${PORT}`)
})

// io socket

const io = require("socket.io")(server)

// add io to every request
app.use(function (req, res, next) {
  req.io = io
  next()
})

// routes
app.use("/api/v1/user", userRoute)
