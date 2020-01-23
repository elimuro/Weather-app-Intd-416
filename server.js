var express = require('express'); // load express into a variable called 'express'

var app = express(); // store the express function inside 'app'
var server = app.listen(3000); // tell the app to listen to port 3000 and store the result inside 'server'

app.use(express.static('public')); // tell the app to use express and serve the static files inside 'public'

console.log('server is running'); // console log to indicate that the server is running