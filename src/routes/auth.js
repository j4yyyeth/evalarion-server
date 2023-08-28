var express = require("express");
var router = express.Router();

const isAuthenticated = require("../middleware/isAuthed");
const authController = require("../controllers/authController");

router.post("/signup", authController.sign_up);
router.post("/signin", authController.sign_in);
router.get("/verify", isAuthenticated, authController.verify);

module.exports = router;
