var express = require("express");
var router = express.Router();

const usersController = require("../controllers/usersController");

router.get("/all", usersController.all_users);
router.get("/one", usersController.one_user);
router.delete("/delete", usersController.delete_user);
router.post("/add-language", usersController.add_language);
router.post("/add-language-learn", usersController.add_language_learn);
router.post("/add-language-test", usersController.add_language_test);
router.post("/add-project-test", usersController.add_project_test);
router.post("/code-block", usersController.add_code_test);

module.exports = router;
