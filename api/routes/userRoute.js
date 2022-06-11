const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const { v4: uuidv4 } = require("uuid")

const userController = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")

const storage = multer.diskStorage({

  destination: function(req, file, cb) {
    cb(null, "public/images")
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
  }

})

let upload = multer({ storage })

router.post("/signup", upload.single("picture"), userController.signup)
router.post("/signin", userController.signin)
router.get("/", authMiddleware.verify, userController.getUsers)
router.get("/:id", authMiddleware.verify, userController.findOneUser)

module.exports = router
