// alliances.js - Routes for Alliances entity

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Get all alliances
router.get('/', function (req, res) {
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
router.post('/add-alliance', function (req, res) {
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
router.put('/put-alliance-ajax', function (req, res, next) {
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
            alliance_name = '${new_alliance_name}', 
            stat_boost = '${new_stat_boost}', 
            stat_boost_type = '${new_stat_boost_type}' 
        WHERE 
            alliance_id = '${alliance_id}';
    `;

    db.pool.query(queryAlliance, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        } else {
            res.status(200).json(rows);
        }
    });
});

// Delete Alliance route
router.delete('/delete-alliance-ajax', function (req, res) {
    let data = req.body; // Get the request body data
    let alliance_id_input = parseInt(data.alliance_id); // Get the alliance ID

    // Delete the alliance from the database
    let query = `
        DELETE FROM 
            Alliances 
        WHERE 
            alliance_id = '${alliance_id_input}';
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

module.exports = router;
