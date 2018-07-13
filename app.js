var express = require('express');

var app = express();
const session = require('express-session');
var consumer = require('./routes/consumer');
var contractor = require('./routes/contractor');

app.use(session({
	secret: 'jobtest', 
	resave: false, 
	saveUninitialized: true,
	name: 'sessionid',
	cookie: {secure: false, maxAge: 1500000}
}));
app.use('/contractors', contractor);
app.use('/consumers', consumer);


module.exports = app;
