var express = require("express");
var router = express.Router();

const isAuthenticated = require("../middleware/isAuthed");
const usersController = require("../controllers/usersController");

router.get("/all", usersController.all_users);
router.get("/one", usersController.one_user);
router.delete("/delete", usersController.delete_user);
router.post("/add-language", usersController.add_language);
router.post("/add-language-learn", usersController.add_language_learn);
router.post("/add-language-test", isAuthenticated, usersController.add_language_test);
router.post("/add-project-test", usersController.add_project_test);
router.post("/add-code-block", usersController.add_code_test);
router.get("/:id", usersController.params_test);
router.get("/info/:id", usersController.params_test_info);

module.exports = router;
