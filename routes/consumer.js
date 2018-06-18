const express = require("express");
const bodyParser = require("body-parser")
const router = express.Router();
const consumerRegistration = require("../controllers/consumerRegistration")
router.use(bodyParser.json());

router.post("/register", consumerRegistration);

module.exports = router;