const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const consumerRegistration = require("../controllers/consumerRegistration");
const consumerSignIn = require("../controllers/consumerSignIn");
const handlingQuotes = require("../controllers/handlingQuotes");
const ConsumerGetsQuotes = require("../controllers/ConsumerGetsQuotes");

router.use(bodyParser.json());

router.post("/register", consumerRegistration);
router.post("/signin", consumerSignIn);
router.get("/quotes", ConsumerGetsQuotes);
router.put("/handlequotes", handlingQuotes);

module.exports = router;