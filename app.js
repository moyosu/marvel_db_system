// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))
PORT = 8686;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');

app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: "main", // Set "main.hbs" as the default layout
    layoutsDir: __dirname + "/views/layouts" // Specify layouts directory
}));
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Citation for the following code below:
// Date: 03/16/2025
// Adapted from: StackOverflow
// Source URL: https://stackoverflow.com/questions/44544990/how-to-set-routes-in-express-app-use-vs-app-get
// Purpose: This code was used to set up the routes for the web server. The purpose of the routes is to 
// modularize the code and make it more well structured and easier to manage. 

// Import routes
const routes = require('./routes');

// Home page
app.get('/', function (req, res) {
    res.render('home', { title: "Marvel Game Statistics Management System" });  // an object where 'data' is equal to the 'rows' we
});                                                                             // received back from the query

// Use routes
app.use('/abilities', routes.abilities);
app.use('/alliances', routes.alliances);
app.use('/battleParticipants', routes.battleParticipants);
app.use('/battles', routes.battles);
app.use('/characters', routes.characters);
app.use('/playerBattles', routes.playerBattles);
app.use('/playerCharacters', routes.playerCharacters);
app.use('/players', routes.players);

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
}); 