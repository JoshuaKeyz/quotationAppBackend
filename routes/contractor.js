const express = require("express");
const bodyParser = require("body-parser")
const router = express.Router();
const contractorRegistration = require("../controllers/contractorRegistration")
router.use(bodyParser.json());

router.post("/register", contractorRegistration);

module.exports = router;