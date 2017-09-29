const express = require ('express');
const path = require ('path');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const passport = require ('passport');
const mongoose = require ('mongoose');
const config = require('./cfg/database');

const app = express();
const port = 3000; // port number

// MongoDB
mongoose.connect(config.database, { useMongoClient: true });
// On Success
mongoose.connection.on('connected', function() {
    console.log('DEBUG: ' + 'Connected to database: ' + config.database);
});
// On Error
mongoose.connection.on('error', function() {
    console.log('DEBUG: ' + 'Error while connecting to database: ' + config.database);
});

// route to users.js file
const users = require('./routes/users'); 

// CORS Middleware
app.use(cors());

// Set Static Folder (public)
app.use(express.static(path.join(__dirname, 'public')));

// Body-Parser Middleware
app.use(bodyParser.json());

// Send to users page
app.use('/users', users);;

// Home Page Route
app.get('/', function(req, res) {
    res.send('Loading...');
});

// Start server (listen on port number)
app.listen(port, function() {
    console.log('DEBUG: ' + new Date() + ' - Server started on port ' + port );
});


