// playerBattles.js - Routes for PlayerBattles entity

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Get all player battles
router.get('/', function (req, res) {
    let query1 = `
        SELECT 
            Players.player_id AS 'Player ID',
            Players.player_name AS 'Player', 
            Battles.battle_id AS 'Battle ID',
            Battles.time_stamp AS 'Time Stamp' 
        FROM 
            PlayerBattles 
        JOIN 
            Players 
        ON 
            PlayerBattles.track_player = Players.player_id 
        JOIN 
            Battles 
        ON 
            PlayerBattles.track_battle = Battles.battle_id;
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
            battle_id AS 'Battle ID',
            time_stamp AS 'Time Stamp'
        FROM
            Battles;
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
            db.pool.query(query3, function (error, battleRows, fields) {
                if (error) {
                    console.error("Error executing query: ", error); // Log any errors
                    res.status(500).send("Error executing query"); // Send an error response
                    return;
                }

                let data = {
                    playerBattles: rows,
                    players: playerRows,
                    battles: battleRows
                };

                console.log("Rows returned: ", data); // Log the returned rows
                res.render('playerBattles', { data: data, title: "PlayerBattles Page" });
            });
        });
    });
});

// Add PlayerBattle route
router.post('/add-player-battle', function (req, res) {
    let data = req.body; // Get the request body data
    let player_input = data.player;
    let battle_input = data.battle;

    // Insert the new player battle into the database
    let query = `
        INSERT INTO PlayerBattles 
            (track_player, track_battle) 
        VALUES 
            ('${player_input}', '${battle_input}');
    `;

    db.pool.query(query, function (error, results, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            // If there was no error, perform a SELECT * on PlayerBattles     
            let query2 = `
                SELECT 
                    track_player AS 'Player', 
                    track_battle AS 'Battle' 
                FROM 
                    PlayerBattles;
            `;
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        res.status(409).send("Duplicate entry"); // Send a conflict response
                        return;
                    } else {
                        console.error("Error executing query: ", error); // Log any errors
                        res.status(500).send("Error executing query"); // Send an error response
                        return;
                    }
                } else {
                    res.status(200).json(rows);
                }
            });
        }
    });
});

// Update PlayerBattle route
router.put('/put-player-battle-ajax', function (req, res, next) {
    let data = req.body;
    console.log("Data: ", data);

    // Get the new and previous IDs
    let player_id = parseInt(data.player_id); // New player ID
    let battle_id = parseInt(data.battle_id); // New battle ID
    let prev_player_id = parseInt(data.prev_player_id); // Previous player ID
    let prev_battle_id = parseInt(data.prev_battle_id); // Previous battle ID
    
    let queryPlayerBattle = `
        UPDATE 
            PlayerBattles 
        SET 
            track_player = ?, 
            track_battle = ? 
        WHERE 
            track_player = ? 
        AND 
            track_battle = ?;
    `;

    db.pool.query(queryPlayerBattle, [player_id, battle_id, prev_player_id, prev_battle_id], function (error, rows, fields) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(409).send("Duplicate entry"); // Send a conflict response
                return;
            }
            else {
                res.status(500).send("Error executing query"); // Send an error response
                return;
            }
        } else {
            res.status(200).json(rows);
        }
    });
});

// Delete PlayerBattle route
router.delete('/delete-player-battle-ajax', function (req, res, next) {
    let data = req.body;
    let player_id = parseInt(data.player_id);
    let battle_id = parseInt(data.battle_id);

    let delete_player_battle = `
        DELETE FROM 
            PlayerBattles 
        WHERE 
            track_player = ? 
        AND 
            track_battle = ?;
    `;

    db.pool.query(delete_player_battle, [player_id, battle_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            console.log("Delete successful");
            res.sendStatus(204);
        }
    });
});

module.exports = router;
