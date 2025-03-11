// App.js

// Database
const e = require('express');
var db = require('./database/db-connector')

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))
PORT = 8615;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars

const Handlebars = require('handlebars');

Handlebars.registerHelper('eq', function (a, b) {
    console.log("a: ", a);
    console.log("b: ", b);
    return a === b;
});

app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: "main", // Set "main.hbs" as the default layout
    layoutsDir: __dirname + "/views/layouts" // Specify layouts directory
}));
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


app.get('/', function (req, res) {
    res.render('home', { title: "Marvel Game Statistics Management System" });                    // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

/**************************************************
 * ABILITIES SECTION
 **************************************************/
// Abilities page
app.get('/abilities', function (req, res) {
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
            res.render('abilities', { data: data, title: "Abilities Page"});
        });
    });
});

// Add Ability route
app.post('/add-ability', function (req, res) {
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
app.put('/put-ability-ajax', function (req, res) {
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
            ability_name = ?, 
            special_effect = ?, 
            ability_range = ?, 
            cooldown = ?, 
            charges = ?, 
            track_character = ? 
        WHERE 
            ability_id = ?;
    `;

    // Execute the query
    db.pool.query(query, [ability_name, special_effect, ability_range, cooldown, charges, track_character, ability_id], function (error, results, fields) {
        if (error) {
            console.error("Error updating ability: ", error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Delete Ability route
app.delete('/delete-ability-ajax', function (req, res) {
    let data = req.body; // Get the request body data
    let ability_id_input = parseInt(data.ability_id); // Get the ability ID

    // Delete the ability from the database
    let query = `
        DELETE FROM 
            Abilities 
        WHERE 
            ability_id = ?;
    `;

    db.pool.query(query, [ability_id_input], function (error, results, fields) {
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

/**************************************************
 * ALLIANCES SECTION
 **************************************************/

// Alliances page
app.get('/alliances', function (req, res) {
    let query1 = `
        SELECT 
            alliance_id AS 'Alliance ID', 
            alliance_name AS 'Alliance', 
            stat_boost AS 'Stat Boost', 
            stat_boost_type AS 'Stat Boost Type' 
        FROM 
            Alliances;
    `;

    db.pool.query(query1, function (error, rows, fields) { // Execute the query
        if (error) {
            console.error("Error executing query: ", error); // Log any errors
            res.status(500).send("Error executing query"); // Send an error response
            return;
        }

        console.log("Rows returned: ", rows); // Log the returned rows
        res.render('alliances', { data: rows, title: "Alliances Page" }); // Render the alliances.hbs file and send the data
    });
});

// Add Alliance route
app.post('/add-alliance', function (req, res) {
    let data = req.body; // Get the request body data
    let alliance_name_input = data.alliance_name;
    let stat_boost_input = data.stat_boost;
    let stat_boost_type_input = data.stat_boost_type;

    // Insert the new alliance into the database
    let query = `
        INSERT INTO Alliances 
            (alliance_name, stat_boost, stat_boost_type) 
        VALUES 
            ('${alliance_name_input}', '${stat_boost_input}', '${stat_boost_type_input}');
    `;

    db.pool.query(query, function (error, results, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            // If there was no error, perform a SELECT * on Alliances
            let query2 = `
                SELECT 
                    alliance_id AS 'Alliance ID', 
                    alliance_name AS 'Alliance', 
                    stat_boost AS 'Stat Boost', 
                    stat_boost_type AS 'Stat Boost Type' 
                FROM 
                    Alliances;
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

// Update Alliance route
app.put('/put-alliance-ajax', function (req, res, next) {
    let data = req.body;
    console.log("Data: ", data);
    // Ensure alliance_id is included in the request
    let alliance_id = parseInt(data.alliance_id); // Get the alliance ID
    let new_alliance_name = data.alliance_name; // No need to parseInt for name
    let new_stat_boost = parseInt(data.stat_boost);
    let new_stat_boost_type = data.stat_boost_type; // No need to parseInt for stat_boost_type
    let queryAlliance = `
        UPDATE 
            Alliances 
        SET 
            alliance_name = ?, 
            stat_boost = ?, 
            stat_boost_type = ? 
        WHERE 
            alliance_id = ?;
    `;

    db.pool.query(queryAlliance, [new_alliance_name, new_stat_boost, new_stat_boost_type, alliance_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

// Delete Alliance route
app.delete('/delete-alliance-ajax', function (req, res) {
    let data = req.body; // Get the request body data
    let alliance_id_input = parseInt(data.alliance_id); // Get the alliance ID

    // Delete the alliance from the database
    let query = `
        DELETE FROM 
            Alliances 
        WHERE 
            alliance_id = ?;
    `;

    db.pool.query(query, [alliance_id_input], function (error, results, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            // If there was no error, perform a SELECT * on Alliances
            let query2 = `
                SELECT 
                    alliance_id AS 'Alliance ID', 
                    alliance_name AS 'Alliance', 
                    stat_boost AS 'Stat Boost', 
                    stat_boost_type AS 'Stat Boost Type' 
                FROM 
                    Alliances;
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

/**************************************************
 * BATTLEPARTICIPANTS SECTION
 **************************************************/

// BattleParticipants page
app.get('/battleParticipants', function (req, res) {
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
        res.render('battleParticipants', { data: rows, title: "BattleParticipants Page"  }); // Render the players.hbs file and send the data
    });
});

/**************************************************
 * BATTLES SECTION
 **************************************************/
// Battles page
app.get('/battles', function (req, res) {
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
        res.render('battles', { data: rows, title: "Battles Page"  }); // Render the players.hbs file and send the data
    });
});

// Add Battle route
app.post('/add-battle-ajax', function (req, res) {
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
            (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    db.pool.query(query, [time_stamp, is_victory, kills, deaths, assists, damage_dealt, damage_blocked, healing, accuracy], function (error, results, fields) {
        if (error) {
            console.error("Error adding battle: ", error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Update Battle route
app.put('/put-battle-ajax', function (req, res) {
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
            time_stamp = ?, 
            is_victory = ?, 
            kills = ?, 
            deaths = ?, 
            assists = ?, 
            damage_dealt = ?, 
            damage_blocked = ?, 
            healing = ?, 
            accuracy = ? 
        WHERE 
            battle_id = ?;
    `;

    db.pool.query(query, [time_stamp, is_victory, kills, deaths, assists, damage_dealt, damage_blocked, healing, accuracy, battle_id], function (error, results, fields) {
        if (error) {
            console.error("Error updating battle: ", error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Delete Battle route
app.delete('/delete-battle-ajax', function (req, res) {
    let data = req.body; // Get the request body data
    let battle_id = parseInt(data.battle_id); // Get the battle ID

    // Query to delete the battle
    let query = `
        DELETE FROM 
            Battles 
        WHERE 
            battle_id = ?;
    `;

    db.pool.query(query, [battle_id], function (error, results, fields) {
        if (error) {
            console.error("Error deleting battle: ", error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(results);
        }
    });
});

/**************************************************
 * CHARACTERS SECTION
 **************************************************/
// Get data for Characters page
app.get('/characters', function (req, res) {
    let query1 = `
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
            res.render('characters', { data: data, title: "Characters Page"  }); // Render the characters.hbs file and send the data
        });
    });
});

// Add Character route
app.post('/add-character', function (req, res) {
    let data = req.body; // Get the request body data
    let character_name_input = data.character_name;
    let role_input = data.role;
    let health_input = data.health;
    let has_secondary_weapon_input = data.has_secondary_weapon;
    let move_speed_input = data.move_speed;
    let critical_multiplier_input = data.critical_multiplier;
    let ammo_capacity_input = data.ammo_capacity;
    let track_alliance_input = data.track_alliance;

    // Insert the new character into the database
    let query = `
        INSERT INTO Characters 
            (character_name, role, health, has_secondary_weapon, move_speed, critical_multiplier, ammo_capacity, track_alliance) 
        VALUES 
            ('${character_name_input}', '${role_input}', '${health_input}', '${has_secondary_weapon_input}', '${move_speed_input}', '${critical_multiplier_input}', '${ammo_capacity_input}', '${track_alliance_input}');
    `;

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
app.put('/put-character-ajax', function (req, res, next) {
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
            character_name = ?, 
            role = ?, 
            health = ?, 
            has_secondary_weapon = ?, 
            move_speed = ?, 
            critical_multiplier = ?, 
            ammo_capacity = ?, 
            track_alliance = ? 
        WHERE 
            character_id = ?;
    `;

    db.pool.query(queryCharacter, [
        new_character_name, new_role,
        new_health,
        new_has_secondary_weapon,
        new_move_speed,
        new_critical_multiplier,
        new_ammo_capacity,
        new_track_alliance,
        character_id
    ], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

// delete character
app.delete('/delete-character-ajax', function (req, res, next) {
    console.log("starting delete request");
    let data = req.body;
    let character_id_input = parseInt(data.character_id);
    let delete_character = `
        DELETE FROM 
            Characters 
        WHERE 
            character_id = ?;
    `;

    // Run the query
    db.pool.query(delete_character, [character_id_input], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); // Bad request
        } else {
            console.log("Delete successful");
            res.sendStatus(204); // No content, indicating successful deletion
        }
    });
});


/**************************************************
 * PLAYERBATTLES SECTION
 **************************************************/

// PlayerBattles page
app.get('/playerBattles', function (req, res) {
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
        res.render('playerBattles', { data: rows, title: "PlayerBattles Page"  });
    });
});

/**************************************************
 * PLAYERCHARACTERS SECTION
 **************************************************/

// PlayerCharacters page
app.get('/playerCharacters', function (req, res) {
    let query1 = `
        SELECT 
            Players.player_name AS 'Player', 
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
                res.render('playerCharacters', { data: data, title: "PlayerCharacters Page"  });
            });
        });
    });
});

// Add PlayerCharacter route
app.post('/add-player-character', function (req, res) {
    let data = req.body; // Get the request body data
    let track_player_input = data.track_player;
    let track_character_input = data.track_character;

    // Insert the new player into the database
    let query = `
        INSERT INTO PlayerCharacters 
            (track_player, track_character) 
        VALUES 
            ('${track_player_input}', '${track_character_input}');
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
                    Players.player_name AS 'Player', 
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

/**************************************************
 * PLAYER SECTION
 **************************************************/

// New route for the players page
app.get('/players', function (req, res) {
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
        res.render('players', { data: rows, title: "Players Page"  }); // Render the players.hbs file and send the data
    });
});

// Add new player route
app.post('/add-player', function (req, res) {
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
app.put('/put-player-ajax', function (req, res, next) {
    let data = req.body;

    // Ensure player_id is included in the request
    let player_id = parseInt(data.player_id); // Get the player ID
    let new_player_name = data.player_name; // No need to parseInt for name
    let new_rank = data.rank; // No need to parseInt for rank

    let queryPlayer = `
        UPDATE 
            Players 
        SET 
            player_name = ?, 
            rank = ? 
        WHERE 
            player_id = ?;
    `;

    db.pool.query(queryPlayer, [new_player_name, new_rank, player_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

// Delete player
app.delete('/delete-player-ajax', function (req, res, next) {
    console.log("starting delete request");
    let data = req.body;
    let player_id_input = parseInt(data.player_id);
    let delete_player = `
        DELETE FROM 
            Players 
        WHERE 
            player_id = ?;
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

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});