// App.js

// Database
var db = require('./database/db-connector')

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))
PORT        = 8687;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: "main", // Set "main.hbs" as the default layout
    layoutsDir: __dirname + "/views/layouts" // Specify layouts directory
}));
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


app.get('/', function(req, res)
    {  
        res.render('home', { title: "Home Page"});                    // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

    // Abilities page
app.get('/abilities', function(req, res) {
    res.render('abilities', { title: "Abilities Page"});
});

// Alliances page
app.get('/alliances', function(req, res) {
    res.render('alliances', { title: "Alliances Page"});
});

// BattleParticipants page
app.get('/battleParticipants', function(req, res) {
    res.render('battleParticipants', { title: "Battle Participants"});
});

// Battles page
app.get('/battles', function(req, res) {
    res.render('battles', { title: "Battles Page"});
});

// Characters page
app.get('/characters', function(req, res) {
    res.render('characters', { title: "Characters Page"});
});

// PlayerBattles page
app.get('/playerBattles', function(req, res) {
    res.render('playerBattles', { title: "Player Battles"});
});

/**************************************************
 * PLAYER SECTION
 **************************************************/
// PlayerCharacters page
app.get('/playerCharacters', function(req, res){
    res.render('playerCharacters', { title: "Player Characters"});
});

// New route for the players page
app.get('/players', function(req, res) {
    let query1 = "SELECT player_id as 'Player ID', player_name as 'Player', rank as 'Rank' FROM Players;";               // Define our query

    db.pool.query(query1, function(error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }

        console.log("Rows returned: ", rows); // Log the returned rows
        res.render('players', {data: rows}); // Render the players.hbs file and send the data
    });
});

// Add new player route
app.post('/add-player', function (req, res) {
    let data = req.body; // Get the request body data
    let playerName = data.player_name;
    let playerRank = data.rank;

    // Insert the new player into the database
    let query = `INSERT INTO Players (player_name, rank) VALUES ('${playerName}', '${playerRank}');`;

    db.pool.query(query, function (error, results, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            // If there was no error, perform a SELECT * on Players
            let query2 = `SELECT player_id as 'Player ID', player_name as 'Player', rank as 'Rank' FROM Players;`;
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.status(400).json({ error: error.message });
                } else {
                    res.status(200).json(rows);
                }
            });
        }
    });
});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});