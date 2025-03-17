// index.js - Export all routes

// Citation for the following code below:
// Date: 03/18/2025
// Adapted from: freecodecamp.org
// Source URL: https://www.freecodecamp.org/news/module-exports-how-to-export-in-node-js-and-javascript/
// Purpose: This code was used to set up the routes for the web server. The purpose of the routes is to 
// modularize the code and make it more well structured and easier to manage. 

const abilities = require('./abilities');
const alliances = require('./alliances');
const battleParticipants = require('./battleParticipants');
const battles = require('./battles');
const characters = require('./characters');
const playerBattles = require('./playerBattles');
const playerCharacters = require('./playerCharacters');
const players = require('./players');

module.exports = {
    abilities,
    alliances,
    battleParticipants,
    battles,
    characters,
    playerBattles,
    playerCharacters,
    players
};
