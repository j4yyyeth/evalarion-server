var express = require("express");
var router = express.Router();

const usersController = require("../controllers/usersController");

router.get("/all", usersController.all_users);
router.get("/one", usersController.one_user);
router.delete("/delete", usersController.delete_user);
router.post("/add-language", usersController.add_language);

module.exports = router;
