// battles.js - Routes for Battles entity

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Get all battles
router.get('/', function (req, res) {
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
        res.render('battles', { data: rows, title: "Battles Page" }); // Render the players.hbs file and send the data
    });
});

// Add Battle route
router.post('/add-battle-ajax', function (req, res) {
    let data = req.body; // Get the request body data

    // Extract data from the request body
    let time_stamp = data.time_stamp;
    let is_victory = data.is_victory === 'true' ? 1 : 0; // Convert to boolean
    let kills = parseInt(data.kills);
    let deaths = parseInt(data.deaths);
    let assists = parseInt(data.assists);
    let damage_dealt = parseInt(data.damage_dealt);
    let damage_blocked = parseInt(data.damage_blocked);
    let healing = parseInt(data.healing);
    let accuracy = parseInt(data.accuracy);

    // Insert the new battle into the database
    let query = `
        INSERT INTO Battles 
            (time_stamp, is_victory, kills, deaths, assists, damage_dealt, damage_blocked, healing, accuracy) 
        VALUES 
            ('${time_stamp}', 
            '${is_victory}', 
            '${kills}', 
            '${deaths}', 
            '${assists}', 
            '${damage_dealt}', 
            '${damage_blocked}', 
            '${healing}', 
            '${accuracy}');
    `;

    db.pool.query(query, function (error, results, fields) {
        if (error) {
            console.error("Error adding battle: ", error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Update Battle route
router.put('/put-battle-ajax', function (req, res) {
    let data = req.body; // Get the request body data

    // Extract data from the request body
    let battle_id = parseInt(data.battle_id);
    let time_stamp = data.time_stamp;
    let is_victory = data.is_victory === 'true' ? 1 : 0; // Convert to boolean
    let kills = parseInt(data.kills);
    let deaths = parseInt(data.deaths);
    let assists = parseInt(data.assists);
    let damage_dealt = parseInt(data.damage_dealt);
    let damage_blocked = parseInt(data.damage_blocked);
    let healing = parseInt(data.healing);
    let accuracy = parseInt(data.accuracy);

    // Query to update the battle
    let query = `
        UPDATE Battles 
        SET 
            time_stamp = '${time_stamp}', 
            is_victory = '${is_victory}', 
            kills = '${kills}', 
            deaths = '${deaths}', 
            assists = '${assists}', 
            damage_dealt = '${damage_dealt}', 
            damage_blocked = '${damage_blocked}', 
            healing = '${healing}', 
            accuracy = '${accuracy}' 
        WHERE 
            battle_id = '${battle_id}';
    `;

    db.pool.query(query, function (error, results, fields) {
        if (error) {
            console.error("Error updating battle: ", error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Delete Battle route
router.delete('/delete-battle-ajax', function (req, res) {
    let data = req.body; // Get the request body data
    let battle_id = parseInt(data.battle_id); // Get the battle ID

    // Query to delete the battle
    let query = `
        DELETE FROM 
            Battles 
        WHERE 
            battle_id = '${battle_id}';
    `;

    db.pool.query(query, function (error, results, fields) {
        if (error) {
            console.error("Error deleting battle: ", error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;
