const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const consumerRegistration = require('../controllers/consumer_registration');
const consumerSignIn = require('../controllers/consumer_signin');
const handlingQuotes = require('../controllers/handling_quotes');
const consumerGetsQuotes = require('../controllers/consumer_gets_quotes');

router.use(bodyParser.json());

router.post('/register', consumerRegistration);
router.post('/signin', consumerSignIn);
router.get('/quotes', consumerGetsQuotes);
router.put('/handlequotes', handlingQuotes);

module.exports = router;