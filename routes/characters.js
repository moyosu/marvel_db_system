// characters.js - Routes for Characters entity

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Get all characters
router.get('/', function (req, res) {
    let query1 = `
        SELECT 
            character_id AS 'Character ID', 
            character_name AS 'Character', 
            role AS 'Role', 
            health AS 'Health', 
            has_secondary_weapon AS 'Has Secondary Weapon', 
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
            res.render('characters', { data: data, title: "Characters Page" }); // Render the characters.hbs file and send the data
        });
    });
});

// Add Character route
router.post('/add-character', function (req, res) {
    let data = req.body; // Get the request body data
    let character_name_input = data.character_name;
    let role_input = data.role;
    let health_input = data.health;
    let has_secondary_weapon_input = data.has_secondary_weapon;
    let move_speed_input = data.move_speed;
    let critical_multiplier_input = data.critical_multiplier;
    // If the ammo_capacity is an empty string, null, or undefined, set it to null
    let ammo_capacity_input = data.ammo_capacity === '' || data.ammo_capacity === null || data.ammo_capacity === undefined
        ? null
        : parseInt(data.ammo_capacity);
    // If the track_alliance is an empty string, null, or undefined, set it to null
    let track_alliance_input = data.track_alliance === '' || data.track_alliance === null || data.track_alliance === undefined
        ? null
        : parseInt(data.track_alliance);

    // Insert the new character without ammo capacity into the database
    let queryWithoutAmmoCapacity = `
        INSERT INTO 
            Characters 
                (
                character_name, 
                role, health, 
                has_secondary_weapon, 
                move_speed, 
                critical_multiplier,
                track_alliance
                ) 
        VALUES 
            ('${character_name_input}', 
            '${role_input}', 
            '${health_input}', 
            '${has_secondary_weapon_input}', 
            '${move_speed_input}', 
            '${critical_multiplier_input}', 
            '${track_alliance_input}');
    `;
    // Insert the new character wihtout alliance into the database
    let queryWithoutAlliance = `
        INSERT INTO 
            Characters 
                (
                character_name, 
                role, health, 
                has_secondary_weapon, 
                move_speed, 
                critical_multiplier, 
                ammo_capacity
                ) 
        VALUES 
            ('${character_name_input}', 
            '${role_input}', 
            '${health_input}', 
            '${has_secondary_weapon_input}', 
            '${move_speed_input}', 
            '${critical_multiplier_input}', 
            '${ammo_capacity_input}');
    `;
    // Insert the new character wihtout ammo capacity and alliance into the database
    let queryWithoutAllianceAndAmmoCapacity = `
        INSERT INTO 
            Characters 
                (
                character_name, 
                role, health, 
                has_secondary_weapon, 
                move_speed, 
                critical_multiplier
                ) 
        VALUES 
            ('${character_name_input}', 
            '${role_input}', 
            '${health_input}', 
            '${has_secondary_weapon_input}', 
            '${move_speed_input}', 
            '${critical_multiplier_input}');
    `;
    // Insert the new character with ammo and alliance into the database
    let query = `
        INSERT INTO 
            Characters 
                (
                character_name, 
                role, health, 
                has_secondary_weapon, 
                move_speed, 
                critical_multiplier, 
                ammo_capacity, 
                track_alliance
                ) 
        VALUES 
            ('${character_name_input}', 
            '${role_input}', 
            '${health_input}', 
            '${has_secondary_weapon_input}', 
            '${move_speed_input}', 
            '${critical_multiplier_input}', 
            '${ammo_capacity_input}', 
            '${track_alliance_input}');
    `;

    // Select the query to run based on the input
    if (ammo_capacity_input === null && track_alliance_input === null) {
        query = queryWithoutAllianceAndAmmoCapacity;
    } else if (ammo_capacity_input === null) {
        query = queryWithoutAmmoCapacity;
    } else if (track_alliance_input === null) {
        query = queryWithoutAlliance;
    };

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

// Update character
router.put('/put-character-ajax', function (req, res, next) {
    let data = req.body;
    console.log("Data: ", data);
    // Ensure character_id is included in the request
    let character_id = parseInt(data.character_id); // Get the character ID
    let new_character_name = data.character_name; // No need to parseInt for name
    let new_role = data.role; // No need to parseInt for role
    let new_health = parseInt(data.health);
    let new_has_secondary_weapon = parseInt(data.has_secondary_weapon);
    let new_move_speed = parseInt(data.move_speed);
    let new_critical_multiplier = parseInt(data.critical_multiplier);
    // If the ammo_capacity is an empty string, null, or undefined, set it to null
    let new_ammo_capacity = data.ammo_capacity === '' || data.ammo_capacity === null || data.ammo_capacity === undefined
        ? null
        : parseInt(data.ammo_capacity);
    // If the track_alliance is an empty string, null, or undefined, set it to null
    let new_track_alliance = data.track_alliance === '' || data.track_alliance === null || data.track_alliance === undefined
        ? null
        : parseInt(data.track_alliance);
    let queryCharacter = `
        UPDATE 
            Characters 
        SET 
            character_name = '${new_character_name}', 
            role = '${new_role}', 
            health = '${new_health}', 
            has_secondary_weapon = '${new_has_secondary_weapon}', 
            move_speed = '${new_move_speed}', 
            critical_multiplier = '${new_critical_multiplier}', 
            ammo_capacity = '${new_ammo_capacity}', 
            track_alliance = '${new_track_alliance}' 
        WHERE 
            character_id = '${character_id}';
    `;

    db.pool.query(queryCharacter, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

// delete character
router.delete('/delete-character-ajax', function (req, res, next) {
    console.log("starting delete request");
    let data = req.body;
    let character_id_input = parseInt(data.character_id);
    let delete_character = `
        DELETE FROM 
            Characters 
        WHERE 
            character_id = '${character_id_input}';
    `;

    // Run the query
    db.pool.query(delete_character, function (error, rows, fields) {
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
