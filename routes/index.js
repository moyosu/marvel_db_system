// index.js - Export all routes

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
