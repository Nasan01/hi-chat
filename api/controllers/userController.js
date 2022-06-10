const fs = require("fs")
const path = require("path")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const signup = async (req, res) => {
  const { fullname, email, username, password } = req.body
  const picture = req.file.filename

  try {
    const user = new User({ fullname, email, username, password, picture })
    // const user = new User({ fullname, email, username, password })
    await user.save()
    return res.status(201).json({ msg: "User created successfully !" })
  } catch (error) {
    console.log(error)
    if(error.code === 11000) {
      const test = path.parse(__dirname+"/"+picture)
      let dir = test.dir.split("/")
      dir.pop()
      let pathUpload = dir.concat(["public", "images"])
      let allPath = pathUpload.join("/")
      fs.unlink(allPath+"/"+picture, (err) => {
        if(err) throw err
        console.log(picture + " file deleted !! cause there is an error");
      })
      if(error.keyPattern.email === 1){
        return res.status(400).json({ error: "User with this email already exist !" , field: "email"})
      }
      if(error.keyPattern.username === 1) {
        return res.status(400).json({ error: "User with this username already exist !" , field: "username"})
      }
    }
    res.json(error)
  }

}

const signin = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.find(
      { $or: [{ username }, { email: username }] }, 
      { _id:1, username:1, email:1,  fullname:1, password: 1 }
    )

    if(user.length == 0) {
      return res.status(400).json({ msg: "User not registered !" })
    }

    const isMatch = await bcrypt.compare(password, user[0].password)
    if(!isMatch) {
      return res.status(400).json({ msg: "Password not Match !" })
    }

    const token = await jwt.sign({ user: user[0] }, "avo1234", { expiresIn: "2d" })
    const userSend = { 
      _id: user[0]._id, 
      name:user[0].fullname, 
      username:user[0].name,
      email: user[0].email,
      token: `Bearer ${token}` 
    }
    res.status(200).json({ 
      user: userSend
    })
  } catch (error) {
    console.log(error)
    res.json(error)
  }

}

const getUsers = (req, res) => {
  User.find().then((users) => {
    res.json(users)
  })
}

module.exports = {
  signup,
  signin,
  getUsers
}
