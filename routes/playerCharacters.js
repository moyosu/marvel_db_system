// playerCharacters.js - Routes for PlayerCharacters entity

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Get all player characters
router.get('/', function (req, res) {
    let query1 = `
        SELECT 
            Players.player_id AS 'Player ID',
            Players.player_name AS 'Player', 
            Characters.character_id AS 'Character ID',
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

    let query2 = `
        SELECT
            player_id AS 'Player ID',
            player_name AS 'Player'
        FROM
            Players;
    `;
    let query3 = `
        SELECT
            character_id AS 'Character ID',
            character_name AS 'Character'
        FROM
            Characters;
    `;

    db.pool.query(query1, function (error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }
        db.pool.query(query2, function (error, playerRows, fields) {
            if (error) {
                console.error("Error executing query: ", error); // Log any errors
                res.status(500).send("Error executing query"); // Send an error response
                return;
            }
            db.pool.query(query3, function (error, characterRows, fields) {
                if (error) {
                    console.error("Error executing query: ", error); // Log any errors
                    res.status(500).send("Error executing query"); // Send an error response
                    return;
                }

                let data = {
                    playerCharacters: rows,
                    players: playerRows,
                    characters: characterRows
                };

                console.log("Rows returned: ", data); // Log the returned rows
                res.render('playerCharacters', { data: data, title: "PlayerCharacters Page" });
            });
        });
    });
});

// Add PlayerCharacter route
router.post('/add-player-character', function (req, res) {
    let data = req.body; // Get the request body data
    let player_input = data.player;
    let character_input = data.character;

    // Insert the new player into the database
    let query = `
        INSERT INTO PlayerCharacters 
            (track_player, track_character) 
        VALUES 
            ('${player_input}', '${character_input}');
    `;

    db.pool.query(query, function (error, results, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            // If there was no error, perform a SELECT * on PlayerCharacters     
            let query2 = `
                SELECT 
                    track_player AS 'Player', 
                    track_character AS 'Character' 
                FROM 
                    PlayerCharacters;
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

// Update PlayerCharacter route
router.put('/put-player-character-ajax', function (req, res) {
    let data = req.body;
    console.log("Data: ", data);
    // Get the new and previous IDs
    let player_id = parseInt(data.player_id); // New player ID
    let character_id = parseInt(data.character_id); // New character ID
    let prev_player_id = parseInt(data.prev_player_id); // Previous player ID
    let prev_character_id = parseInt(data.prev_character_id); // Previous character ID
    
    let query = `
        UPDATE 
            PlayerCharacters 
        SET 
            track_player = '${player_id}', 
            track_character = '${character_id}' 
        WHERE 
            track_player = '${prev_player_id}' 
        AND 
            track_character = '${prev_character_id}';
    `;
    console.log("Query: ", query);
    db.pool.query(query, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(200).json(rows);
        }
    });
});

// Delete PlayerCharacter route
router.delete('/delete-player-character-ajax', function (req, res) {
    let data = req.body;
    let player_id = parseInt(data.player_id);
    let character_id = parseInt(data.character_id);

    let query = `
        DELETE FROM 
            PlayerCharacters 
        WHERE 
            track_player = '${player_id}' 
        AND 
            track_character = '${character_id}';
    `;

    db.pool.query(query, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log("Delete successful");
            res.sendStatus(204);
        }
    });
});

module.exports = router;
