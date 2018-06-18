var express = require('express');

var app = express();

var consumer = require("./routes/consumer");
var contractor = require("./routes/contractor");

app.use("/contractors", contractor);
app.use("/consumers", consumer);


module.exports = app;
