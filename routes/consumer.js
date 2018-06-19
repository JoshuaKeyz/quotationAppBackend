const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const consumerRegistration = require("../controllers/consumerRegistration");
const consumerSignIn = require("../controllers/consumerSignIn");
const handlingQuotes = require("../controllers/handlingQuotes")
const gettingQuotes = require("../controllers/gettingQuotes")

router.use(bodyParser.json());

router.post("/register", consumerRegistration);
router.post("/signin", consumerSignIn);
router.get("/quotes", gettingQuotes);
router.put("/handlequotes", handlingQuotes);

module.exports = router;