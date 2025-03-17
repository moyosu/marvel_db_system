// abilities.js - Routes for Abilities entity

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Get all abilities
router.get('/', function (req, res) {
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

    let query2 = `
        SELECT 
            character_id AS 'Character ID', 
            character_name AS 'Character' 
        FROM Characters;
    `;

    db.pool.query(query1, function (error, abilityRows, fields) {
        if (error) {
            console.error("Error executing query1: ", error);
            res.status(500).send("Error executing query");
            return;
        }
        db.pool.query(query2, function (error, characterRows, fields) {
            if (error) {
                console.error("Error executing query2: ", error);
                res.status(500).send("Error executing query");
                return;
            }

            let data = {
                abilities: abilityRows,
                characters: characterRows
            };

            console.log("Data: ", data);
            res.render('abilities', { data: data, title: "Abilities Page" });
        });
    });
});

// Add Ability route
router.post('/add-ability', function (req, res) {
    let data = req.body; // Get the request body data
    let ability_name_input = data.ability_name;
    let special_effect_input = data.special_effect;
    let ability_range_input = data.ability_range;
    let cooldown_input = data.cooldown;
    let charges_input = data.charges;
    let track_character_input = data.track_character;

    // Insert the new ability into the database
    let query = `
        INSERT INTO Abilities 
            (ability_name, special_effect, ability_range, cooldown, charges, track_character) 
        VALUES 
            ('${ability_name_input}', '${special_effect_input}', '${ability_range_input}', '${cooldown_input}', '${charges_input}', '${track_character_input}');
    `;

    db.pool.query(query, function (error, results, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            // If there was no error, perform a SELECT * on Abilities
            let query2 = `
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

// Update Ability route
router.put('/put-ability-ajax', function (req, res) {
    let data = req.body;

    // Extract data from the request body
    let ability_id = parseInt(data.ability_id);
    let ability_name = data.ability_name;
    let special_effect = data.special_effect;
    let ability_range = data.ability_range;
    let cooldown = data.cooldown;
    let charges = data.charges;
    let track_character = parseInt(data.track_character);

    // Query to update the ability
    let query = `
        UPDATE Abilities 
        SET 
            ability_name = '${ability_name}', 
            special_effect = '${special_effect}', 
            ability_range = '${ability_range}', 
            cooldown = '${cooldown}', 
            charges = '${charges}', 
            track_character = '${track_character}' 
        WHERE 
            ability_id = '${ability_id}';
    `;

    // Execute the query
    db.pool.query(query, function (error, results, fields) {
        if (error) {
            console.error("Error updating ability: ", error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Delete Ability route
router.delete('/delete-ability-ajax', function (req, res) {
    let data = req.body; // Get the request body data
    let ability_id_input = parseInt(data.ability_id); // Get the ability ID

    // Delete the ability from the database
    let query = `
        DELETE FROM 
            Abilities 
        WHERE 
            ability_id = '${ability_id_input}';
    `;

    db.pool.query(query, function (error, results, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            // If there was no error, perform a SELECT * on Abilities
            let query2 = `
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

module.exports = router;
