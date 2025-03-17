// battleParticipants.js - Routes for BattleParticipants entity

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Get all battle participants
router.get('/', function (_req, res) {
    let query1 = `
        SELECT 
            BattleParticipants.track_battle AS 'Battle ID', 
            Battles.time_stamp AS 'Time Stamp',
            Characters.character_id AS 'Character ID',
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

    let query2 = `
        SELECT
            character_id AS 'Character ID',
            character_name AS 'Character'
        FROM
            Characters;
    `;

    let query3 = `
        SELECT
            battle_id AS 'Battle ID',
            time_stamp AS 'Time Stamp'
        FROM
            Battles;
    `;

    db.pool.query(query1, function (error, rows, _fields) { // Execute the query
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }
        db.pool.query(query2, function (error, characterRows, _fields) {
            if (error) {
                console.error("Error executing query: ", error); // Log any errors
                res.status(500).send("Error executing query"); // Send an error response
                return;
            }
            db.pool.query(query3, function (error, battleRows, _fields) {
                if (error) {
                    console.error("Error executing query: ", error); // Log any errors
                    res.status(500).send("Error executing query"); // Send an error response
                    return;
                }

                let data = {
                    battleParticipants: rows,
                    characters: characterRows,
                    battles: battleRows
                };

                console.log("Rows returned: ", data); // Log the returned rows
                res.render('battleParticipants', { data: data, title: "BattleParticipants Page" }); // Render the players.hbs file and send the data
            });
        });
    });
});

// Add Battle Participant route
router.post('/add-battle-participant', function (req, res) {
    let data = req.body; // Get the request body data
    let battle_input = data.battle;
    let character_input = data.character;

    // Insert the new battle participant into the database
    let query = `
        INSERT INTO BattleParticipants (track_battle, track_character)
        VALUES ('${battle_input}', '${character_input}');
    `;

    db.pool.query(query, function (error, rows, _fields) {
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
            res.render('battleParticipants', { data: data, title: "BattleParticipants Page" }); // Render the players.hbs file and send the data
        }
    });
});

// Update Battle Participant route
router.put('/update-battle-participant', function (req, res) {
    let data = req.body;
    let battle_input = data.battle;
    let character_input = data.character;
    let prev_battle_input = data.prev_battle;
    let prev_character_input = data.prev_character;

    let query = `
        UPDATE 
            BattleParticipants 
        SET 
            track_battle = '${battle_input}', 
            track_character = '${character_input}' 
        WHERE 
            track_battle = '${prev_battle_input}' 
        AND 
            track_character = '${prev_character_input}';
    `;

    db.pool.query(query, function (error, rows, _fields) {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(409).send("Duplicate entry"); // Send a conflict response
                return;
            } else {
                res.status(500).send("Error executing query"); // Send an error response
                return;
            }
        }
        else {
            res.status(200).json(rows);
        }
    });
});

// Delete Battle Participant route
router.delete('/delete-battle-participant-ajax', function (req, res) {
    let data = req.body;
    let battle_id = parseInt(data.battle_id);
    let character_id = parseInt(data.character_id);

    let query = `
        DELETE FROM 
            BattleParticipants 
        WHERE 
            track_battle = '${battle_id}' 
        AND 
            track_character = '${character_id}';
    `;

    db.pool.query(query, function (error, _rows, _fields) {
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
