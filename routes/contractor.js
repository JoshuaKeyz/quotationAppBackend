const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const contractorRegistration = require('../controllers/contractor_registration');
const contractorSignIn = require('../controllers/contractor_signin');
const sendQuotes = require('../controllers/send_quotes');
const reviewingSentQuotes = require('../controllers/reviewing_sent_quotes');
const contractorGetsQuotes = require('../controllers/consumer_gets_quotes');

router.use(bodyParser.json());

router.post('/register', contractorRegistration);
router.post('/signin', contractorSignIn);
router.post('/sendquotes', sendQuotes);
router.put('/quotes', reviewingSentQuotes);
router.get('/quotes', contractorGetsQuotes);

module.exports = router;