// playerBattles.js - Routes for PlayerBattles entity

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Get all player battles
router.get('/', function (req, res) {
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
        res.render('playerBattles', { data: rows, title: "PlayerBattles Page" });
    });
});

module.exports = router;
