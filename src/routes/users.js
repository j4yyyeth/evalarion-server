var express = require("express");
var router = express.Router();

const usersController = require("../controllers/usersController");

router.get("/all", usersController.all_users);
router.post("/create", usersController.create_user);

module.exports = router;
