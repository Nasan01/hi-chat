const mongoose = require("mongoose")

const connectDB = () => {
mongoose
  .connect("mongodb://localhost:27017/hi-chaty", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Successfully Connected To hi-chaty DB !"))
  .catch((err) => console.log(err));
}

module.exports = connectDB