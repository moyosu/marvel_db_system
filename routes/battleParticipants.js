// battleParticipants.js - Routes for BattleParticipants entity

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Get all battle participants
router.get('/', function (req, res) {
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
        res.render('battleParticipants', { data: rows, title: "BattleParticipants Page" }); // Render the players.hbs file and send the data
    });
});

module.exports = router;
