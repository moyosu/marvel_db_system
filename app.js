// App.js

// Database
var db = require('./database/db-connector')

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))
PORT = 8615;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: "main", // Set "main.hbs" as the default layout
    layoutsDir: __dirname + "/views/layouts" // Specify layouts directory
}));
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


app.get('/', function (req, res) {
    res.render('home', { title: "Home Page" });                    // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

/**************************************************
 * ABILITIES SECTION
 **************************************************/
// Abilities page
app.get('/abilities', function (req, res) {
    let query1 = `
        SELECT 
            ability_id AS 'Ability ID', 
            ability_name AS 'Ability', 
            special_effect AS 'Special Effect', 
            ability_range AS 'Range', 
            cooldown AS 'Cooldown', 
            charges AS 'Charges', 
            Characters.character_name AS 'Character' 
        FROM 
            Abilities 
        JOIN 
            Characters 
        ON 
            Abilities.track_character = Characters.character_id;
    `;

    db.pool.query(query1, function (error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }

        console.log("Rows returned: ", rows); // Log the returned rows
        res.render('abilities', { data: rows }); // Render the players.hbs file and send the data
    });
});

/**************************************************
 * ALLIANCES SECTION
 **************************************************/

// Alliances page
app.get('/alliances', function (req, res) {
    let query1 = `
        SELECT 
            alliance_id AS 'Alliance ID', 
            alliance_name AS 'Alliance', 
            stat_boost AS 'Stat Boost', 
            stat_boost_type AS 'Stat Boost Type' 
        FROM 
            Alliances;
    `;

    db.pool.query(query1, function (error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }

        console.log("Rows returned: ", rows); // Log the returned rows
        res.render('alliances', { data: rows }); // Render the alliances.hbs file and send the data
    });
});

/**************************************************
 * BATTLEPARTICIPANTS SECTION
 **************************************************/

// BattleParticipants page
app.get('/battleParticipants', function (req, res) {
    let query1 = `
        SELECT 
            track_battle AS 'Battle ID', 
            Characters.character_name AS 'Character' 
        FROM 
            BattleParticipants 
        JOIN 
            Characters 
        ON 
            BattleParticipants.track_character = Characters.character_id 
        ORDER BY 
            track_battle;
    `;

    db.pool.query(query1, function (error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }

        console.log("Rows returned: ", rows); // Log the returned rows
        res.render('battleParticipants', { data: rows }); // Render the players.hbs file and send the data
    });
});

/**************************************************
 * BATTLES SECTION
 **************************************************/
// Battles page
app.get('/battles', function (req, res) {
    let query1 = `
        SELECT 
            battle_id AS 'Battle ID', 
            time_stamp AS 'Time Stamp', 
            IF(is_victory = 1, 'true', 'false') AS 'Victory', 
            kills AS 'Kills', 
            deaths AS 'Deaths', 
            assists AS 'Assists', 
            damage_dealt AS 'Damage Dealt', 
            damage_blocked AS 'Damage Blocked', 
            healing AS 'Healing', 
            accuracy AS 'Accuracy' 
        FROM 
            Battles;
    `;

    db.pool.query(query1, function (error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }

        console.log("Rows returned: ", rows); // Log the returned rows
        res.render('battles', { data: rows }); // Render the players.hbs file and send the data
    });
});

/**************************************************
 * CHARACTERS SECTION
 **************************************************/
// Get data for Characters page
app.get('/characters', function (req, res) {
    let query1 = `
        SELECT 
            character_id AS 'Character ID', 
            character_name AS 'Character', 
            role AS 'Role', 
            health AS 'Health', 
            IF(has_secondary_weapon = 1, 'true', 'false') AS 'Has Secondary Weapon', 
            move_speed AS 'Move Speed', 
            critical_multiplier AS 'Critical Multiplier', 
            ammo_capacity AS 'Ammo Capacity', 
            Alliances.alliance_name AS 'Alliance'
        FROM 
            Characters 
        LEFT JOIN 
            Alliances 
        ON 
            Characters.track_alliance = Alliances.alliance_id;
    `;

    let query2 = `
        SELECT 
            alliance_id AS 'Alliance ID', 
            alliance_name AS 'Alliance' 
        FROM 
            Alliances;
    `;

    // Execute the first query
    db.pool.query(query1, function (error1, characterRows, fields1) {
        if (error1) {
            console.error("Error executing query: ", error1); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }

        // Execute the second query
        db.pool.query(query2, function (error2, allianceRows, fields2) {
            if (error2) {
                console.error("Error executing query: ", error2); // Log any errors
                res.status(500).send("Error executing query"); // Send an error response
                return;
            }

            // Combine the results into a single object
            let data = {
                characters: characterRows,
                alliances: allianceRows
            };

            console.log("Rows returned: ", data); // Log the returned rows
            res.render('characters', { data: data }); // Render the characters.hbs file and send the data
        });
    });
});

// Add Character route
app.post('/add-character', function (req, res) {
    let data = req.body; // Get the request body data
    let character_name_input = data.character_name;
    let role_input = data.role;
    let health_input = data.health;
    let has_secondary_weapon_input = data.has_secondary_weapon;
    let move_speed_input = data.move_speed;
    let critical_multiplier_input = data.critical_multiplier;
    let ammo_capacity_input = data.ammo_capacity;
    let track_alliance_input = data.track_alliance;

    // Insert the new character into the database
    let query = `
        INSERT INTO Characters 
            (character_name, role, health, has_secondary_weapon, move_speed, critical_multiplier, ammo_capacity, track_alliance) 
        VALUES 
            ('${character_name_input}', '${role_input}', '${health_input}', '${has_secondary_weapon_input}', '${move_speed_input}', '${critical_multiplier_input}', '${ammo_capacity_input}', '${track_alliance_input}');
    `;

    db.pool.query(query, function (error, results, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            // If there was no error, perform a SELECT * on Characters
            let query2 = `
                SELECT 
                    character_id AS 'Character ID', 
                    character_name AS 'Character', 
                    role AS 'Role', 
                    health AS 'Health', 
                    IF(has_secondary_weapon = 1, 'true', 'false') AS 'Has Secondary Weapon', 
                    move_speed AS 'Move Speed', 
                    critical_multiplier AS 'Critical Multiplier', 
                    ammo_capacity AS 'Ammo Capacity', 
                    Alliances.alliance_name AS 'Alliance' 
                FROM 
                    Characters 
                JOIN 
                    Alliances 
                ON 
                    Characters.track_alliance = Alliances.alliance_id;
            `;
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

/**************************************************
 * PLAYERBATTLES SECTION
 **************************************************/

// PlayerBattles page
app.get('/playerBattles', function (req, res) {
    let query1 = `
        SELECT 
            Players.player_name AS 'Player', 
            track_battle AS 'Battle ID' 
        FROM 
            PlayerBattles 
        JOIN 
            Players 
        ON 
            PlayerBattles.track_player = Players.player_id;
    `;

    db.pool.query(query1, function (error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }

        console.log("Rows returned: ", rows); // Log the returned rows
        res.render('playerBattles', { data: rows });
    });
});

/**************************************************
 * PLAYERCHARACTERS SECTION
 **************************************************/

// PlayerCharacters page
app.get('/playerCharacters', function (req, res) {
    let query1 = `
        SELECT 
            Players.player_name AS 'Player', 
            Characters.character_name AS 'Character' 
        FROM 
            PlayerCharacters 
        JOIN 
            Players 
        ON 
            PlayerCharacters.track_player = Players.player_id 
        JOIN 
            Characters 
        ON 
            PlayerCharacters.track_character = Characters.character_id;
    `;

    db.pool.query(query1, function (error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }

        console.log("Rows returned: ", rows); // Log the returned rows
        res.render('playerCharacters', { data: rows });
    });
});

/**************************************************
 * PLAYER SECTION
 **************************************************/

// New route for the players page
app.get('/players', function (req, res) {
    let query1 = `
        SELECT 
            player_id as 'Player ID', 
            player_name as 'Player', 
            rank as 'Rank' 
        FROM 
            Players;
    `;               // Define our query

    db.pool.query(query1, function (error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }

        console.log("Rows returned: ", rows); // Log the returned rows
        res.render('players', { data: rows }); // Render the players.hbs file and send the data
    });
});

// Add new player route
app.post('/add-player', function (req, res) {
    let data = req.body; // Get the request body data
    let player_name_input = data.player_name;
    let rank_input = data.rank;

    // Insert the new player into the database
    let query = `
        INSERT INTO Players 
            (player_name, rank) 
        VALUES 
            ('${player_name_input}', '${rank_input}');
    `;

    db.pool.query(query, function (error, results, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            // If there was no error, perform a SELECT * on Players
            let query2 = `
                SELECT 
                    player_id as 'Player ID', 
                    player_name as 'Player', 
                    rank as 'Rank' 
                FROM 
                    Players;
            `;
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

// Update player
app.put('/put-player-ajax', function (req, res, next) {
    let data = req.body;

    // Ensure player_id is included in the request
    let player_id = parseInt(data.player_id); // Get the player ID
    let new_player_name = data.player_name; // No need to parseInt for name
    let new_rank = data.rank; // No need to parseInt for rank

    let queryPlayer = `
        UPDATE 
            Players 
        SET 
            player_name = ?, 
            rank = ? 
        WHERE 
            player_id = ?;
    `;

    db.pool.query(queryPlayer, [new_player_name, new_rank, player_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

// Delete player
app.delete('/delete-player-ajax', function (req, res, next) {
    console.log("starting delete request");
    let data = req.body;
    let player_id_input = parseInt(data.player_id);
    let delete_player = `
        DELETE FROM 
            Players 
        WHERE 
            player_id = ?;
    `;

    // Run the query
    db.pool.query(delete_player, [player_id_input], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); // Bad request
        } else {
            console.log("Delete successful");
            res.sendStatus(204); // No content, indicating successful deletion
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});