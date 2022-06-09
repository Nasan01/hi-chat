const jwt = require("jsonwebtoken")

const verify = async (req, res, next) => {

  if(req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1]
    try {
      const decodedUser = await jwt.verify(token, "avo1234")
      req.user = decodedUser.user
      next()
    } catch (err) {
      console.log(err)
      return res.status(401).json({ msg: "UnAuhtorized Request !"})
    }
  }
}

module.exports = {
  verify
}
