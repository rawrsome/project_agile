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

// ---- start socket.io
	var io = require('socket.io').listen(server);

	var employees = [];
	var messages = [];
	// hash table for employees
	var employee_id = {};

	io.sockets.on('connection', function(socket) {
		console.log('Establishing communitcation..');
		console.log('Socket id: ', socket.id);

		socket.on('pass_employee_name', function(data) {
			employees.push(data);
			employee_id[socket.id] = data.name;
			console.log(employee_id);
			socket.broadcast.emit('employee_enter', {info: employees});
		});
	})
// ---- end socket.io