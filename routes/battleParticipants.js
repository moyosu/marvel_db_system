// battleParticipants.js - Routes for BattleParticipants entity

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Get all battle participants
router.get('/', function (req, res) {
    let query1 = `
        SELECT 
            BattleParticipants.track_battle AS 'Battle ID', 
            Battles.time_stamp AS 'Time Stamp',
            Characters.character_name AS 'Character' 
        FROM 
            BattleParticipants 
        JOIN 
            Characters 
        ON 
            BattleParticipants.track_character = Characters.character_id 
        JOIN
            Battles
        ON
            BattleParticipants.track_battle = Battles.battle_id
        ORDER BY 
            track_battle DESC;
    `;

    db.pool.query(query1, function (error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }

        console.log("Rows returned: ", rows); // Log the returned rows
        res.render('battleParticipants', { data: rows, title: "BattleParticipants Page" }); // Render the players.hbs file and send the data
    });
});

// Add Battle Participant route
router.post('/add-battle-participant', function (req, res) {
    let data = req.body; // Get the request body data
    let player_input = data.player;
    let character_input = data.character;

    // Insert the new battle participant into the database
    let query = `
        INSERT INTO BattleParticipants (track_battle, track_character)
        VALUES ('${player_input}', '${character_input}');
    `;

    db.pool.query(query, function (error, results, fields) {
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        } else {
            // If there was no error, perform a SELECT * on BattleParticipants
            let query2 = `
                SELECT 
                    track_battle AS 'Battle ID', 
                    Characters.character_name AS 'Character' 
                FROM 
                    BattleParticipants 
                JOIN 
                    Characters 
                ON 
                    BattleParticipants.track_character = Characters.character_id 
            `;

        console.log("Rows returned: ", rows); // Log the returned rows
            res.render('battleParticipants', { data: rows, title: "BattleParticipants Page" }); // Render the players.hbs file and send the data
        }
    });
});

module.exports = router;
