// ---- require
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
// ---- end require
app.use(express.static(path.join(__dirname, './client/static')));


// ---- start config
require('./config/routes.js')(app);
// ----	end config


// ---- start server
var port = process.env.PORT || 7777;
var server = app.listen(7777, function(){
	console.log("Entering realm 7777..");
});
// ---- end server