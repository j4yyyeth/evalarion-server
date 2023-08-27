var express = require("express");
var router = express.Router();

const testController = require("../controllers/testController");

router.get("/one", testController.test_one);

module.exports = router;
