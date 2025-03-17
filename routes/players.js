// players.js - Routes for Players entity

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Get all players
router.get('/', function (req, res) {
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
        res.render('players', { data: rows, title: "Players Page" }); // Render the players.hbs file and send the data
    });
});

// Add new player route
router.post('/add-player', function (req, res) {
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
router.put('/put-player-ajax', function (req, res, next) {
    let data = req.body;

    // Ensure player_id is included in the request
    let player_id = parseInt(data.player_id); // Get the player ID
    let new_player_name = data.player_name; // No need to parseInt for name
    let new_rank = data.rank; // No need to parseInt for rank

    let queryPlayer = `
        UPDATE 
            Players 
        SET 
            player_name = '${new_player_name}', 
            rank = '${new_rank}' 
        WHERE 
            player_id = '${player_id}';
    `;

    db.pool.query(queryPlayer, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

// Delete player
router.delete('/delete-player-ajax', function (req, res, next) {
    console.log("starting delete request");
    let data = req.body;
    let player_id_input = parseInt(data.player_id);
    let delete_player = `
        DELETE FROM 
            Players 
        WHERE 
            player_id = '${player_id_input}';
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

module.exports = router;
