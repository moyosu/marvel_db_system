/****************************************************************
    File Section: 2 - DML queries
    Group: 88
    Authors: Zyan Shull-Bain, Yongkang Mo
    Date: 3/17/2025
    Description:
            This file contains the DML queries for the Marvel Database
            System.
****************************************************************/

/*
 ***************************** Abilities queries *********************************
 */

-- Get all abilities with their associated character names
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
    Characters ON Abilities.track_character = Characters.character_id;

-- Get all characters for the character dropdown in the abilities form
SELECT 
    character_id AS 'Character ID', 
    character_name AS 'Character' 
FROM 
    Characters;

-- Insert a new ability with the provided input values
INSERT INTO 
    Abilities (
        ability_name, 
        special_effect, 
        ability_range, 
        cooldown, 
        charges, 
        track_character
    ) 
VALUES (
    '${ability_name_input}', 
    '${special_effect_input}', 
    '${ability_range_input}', 
    '${cooldown_input}', 
    '${charges_input}', 
    '${track_character_input}'
);

-- Update an existing ability with the provided values
UPDATE 
    Abilities 
SET 
    ability_name = '${ability_name}', 
    special_effect = '${special_effect}', 
    ability_range = '${ability_range}', 
    cooldown = '${cooldown}', 
    charges = '${charges}', 
    track_character = '${track_character}' 
WHERE 
    ability_id = '${ability_id}';

-- Delete an ability with the specified ID
DELETE FROM 
    Abilities 
WHERE 
    ability_id = '${ability_id_input}';


/***************************** Alliances queries *********************************
*/

-- Get all alliances from the database with formatted column names for display
SELECT 
    alliance_id AS 'Alliance ID', 
    alliance_name AS 'Alliance', 
    stat_boost AS 'Stat Boost', 
    stat_boost_type AS 'Stat Boost Type' 
FROM 
    Alliances;

-- Insert a new alliance into the database
INSERT INTO Alliances 
    (alliance_name, stat_boost, stat_boost_type) 
VALUES 
    ('${alliance_name_input}', '${stat_boost_input}', '${stat_boost_type_input}');

-- Update an existing alliance with new information
UPDATE Alliances 
SET 
    alliance_name = '${new_alliance_name}', 
    stat_boost = '${new_stat_boost}', 
    stat_boost_type = '${new_stat_boost_type}' 
WHERE 
    alliance_id = '${alliance_id}';

-- Delete an alliance from the database
DELETE FROM Alliances 
WHERE 
    alliance_id = '${alliance_id_input}';

/***************************** BattleParticipants queries *********************************
*/

-- Get all battle participants with related battle and character information
SELECT 
    BattleParticipants.track_battle AS 'Battle ID', 
    Battles.time_stamp AS 'Time Stamp',
    Characters.character_id AS 'Character ID',
    Characters.character_name AS 'Character' 
FROM 
    BattleParticipants 
JOIN 
    Characters ON BattleParticipants.track_character = Characters.character_id 
JOIN
    Battles ON BattleParticipants.track_battle = Battles.battle_id
ORDER BY 
    track_battle DESC;

-- Get all characters for the character dropdown in the battle participants form
SELECT
    character_id AS 'Character ID',
    character_name AS 'Character'
FROM
    Characters;

-- Get all battles for the battle dropdown in the battle participants form
SELECT
    battle_id AS 'Battle ID',
    time_stamp AS 'Time Stamp'
FROM
    Battles;

-- Insert a new battle participant with the provided battle and character IDs
INSERT INTO BattleParticipants 
    (track_battle, track_character)
VALUES 
    ('${battle_input}', '${character_input}');

-- Get all battle participants with character names for display
SELECT 
    track_battle AS 'Battle ID', 
    Characters.character_name AS 'Character' 
FROM 
    BattleParticipants 
JOIN 
    Characters ON BattleParticipants.track_character = Characters.character_id;

-- Update an existing battle participant with new battle and character information
UPDATE 
    BattleParticipants 
SET 
    track_battle = '${battle_input}', 
    track_character = '${character_input}' 
WHERE 
    track_battle = '${prev_battle_input}' 
AND 
    track_character = '${prev_character_input}';

-- Delete a battle participant with the specified battle and character IDs
DELETE FROM 
    BattleParticipants 
WHERE 
    track_battle = '${battle_id}' 
AND 
    track_character = '${character_id}';

/***************************** Battles queries *********************************
*/
-- Get all battles with formatted data for display
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

-- Insert a new battle with all battle statistics
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

-- Update an existing battle's statistics by battle_id
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

-- Delete a battle by its battle_id
DELETE FROM 
    Battles 
WHERE 
    battle_id = '${battle_id}';

/***************************** Characters queries *********************************
*/
-- Get all characters with their details and alliance information
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

-- Get all alliances for the alliance dropdown in the character form
SELECT 
    alliance_id AS 'Alliance ID', 
    alliance_name AS 'Alliance' 
FROM 
    Alliances;

-- Insert a new character with alliance but without ammo capacity
INSERT INTO Characters 
    (
    character_name, 
    role, 
    health, 
    has_secondary_weapon, 
    move_speed, 
    critical_multiplier,
    track_alliance
    ) 
VALUES 
    (
    '${character_name_input}', 
    '${role_input}', 
    '${health_input}', 
    '${has_secondary_weapon_input}', 
    '${move_speed_input}', 
    '${critical_multiplier_input}', 
    '${track_alliance_input}'
    );

-- Insert a new character with ammo capacity but without alliance
INSERT INTO Characters 
    (
    character_name, 
    role, 
    health, 
    has_secondary_weapon, 
    move_speed, 
    critical_multiplier, 
    ammo_capacity
    ) 
VALUES 
    (
    '${character_name_input}', 
    '${role_input}', 
    '${health_input}', 
    '${has_secondary_weapon_input}', 
    '${move_speed_input}', 
    '${critical_multiplier_input}', 
    '${ammo_capacity_input}'
    );

-- Insert a new character without ammo capacity and without alliance
INSERT INTO Characters 
    (
    character_name, 
    role, 
    health, 
    has_secondary_weapon, 
    move_speed, 
    critical_multiplier
    ) 
VALUES 
    (
    '${character_name_input}', 
    '${role_input}', 
    '${health_input}', 
    '${has_secondary_weapon_input}', 
    '${move_speed_input}', 
    '${critical_multiplier_input}'
    );

-- Insert a new character with both ammo capacity and alliance
INSERT INTO Characters 
    (
    character_name, 
    role, 
    health, 
    has_secondary_weapon, 
    move_speed, 
    critical_multiplier, 
    ammo_capacity, 
    track_alliance
    ) 
VALUES 
    (
    '${character_name_input}', 
    '${role_input}', 
    '${health_input}', 
    '${has_secondary_weapon_input}', 
    '${move_speed_input}', 
    '${critical_multiplier_input}', 
    '${ammo_capacity_input}', 
    '${track_alliance_input}'
    );

-- Update an existing character's information by character_id.
-- The ammo_capacity and track_alliance are optional and can be null.
UPDATE Characters 
SET 
    character_name = '${new_character_name}', 
    role = '${new_role}', 
    health = '${new_health}', 
    has_secondary_weapon = '${new_has_secondary_weapon}', 
    move_speed = '${new_move_speed}', 
    critical_multiplier = '${new_critical_multiplier}', 
    ammo_capacity = ?, 
    track_alliance = ?
WHERE 
    character_id = '${character_id}';

-- Delete a character by its character_id
DELETE FROM Characters 
WHERE 
    character_id = '${character_id_input}';

/***************************** PlayerBattles queries *********************************
*/

-- Get all player battles with player and battle details
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

-- Get all players for dropdown menu
SELECT
    player_id AS 'Player ID',
    player_name AS 'Player'
FROM
    Players;

-- Get all battles for dropdown menu
SELECT
    battle_id AS 'Battle ID',
    time_stamp AS 'Time Stamp'
FROM
    Battles;

-- Insert a new player battle relationship
INSERT INTO PlayerBattles 
    (track_player, track_battle) 
VALUES 
    ('${player_input}', '${battle_input}');

-- Get all player battle relationships
SELECT 
    track_player AS 'Player', 
    track_battle AS 'Battle' 
FROM 
    PlayerBattles;

-- Update an existing player battle relationship
UPDATE 
    PlayerBattles 
SET 
    track_player = '${player_id}', 
    track_battle = '${battle_id}' 
WHERE 
    track_player = '${prev_player_id}' 
AND 
    track_battle = '${prev_battle_id}';

-- Delete a player battle relationship
DELETE FROM 
    PlayerBattles 
WHERE 
    track_player = '${player_id}' 
AND 
    track_battle = '${battle_id}';

/***************************** PlayerCharacters queries *********************************
*/

-- Get all player character relationships with detailed information
SELECT 
    Players.player_id AS 'Player ID',
    Players.player_name AS 'Player', 
    Characters.character_id AS 'Character ID',
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

-- Get all players for dropdown menu
SELECT
    player_id AS 'Player ID',
    player_name AS 'Player'
FROM
    Players;

-- Get all characters for dropdown menu
SELECT
    character_id AS 'Character ID',
    character_name AS 'Character'
FROM
    Characters;

-- Insert a new player character relationship
INSERT INTO PlayerCharacters 
    (track_player, track_character) 
VALUES 
    ('${player_input}', '${character_input}');

-- Get all player character relationships
SELECT 
    track_player AS 'Player', 
    track_character AS 'Character' 
FROM 
    PlayerCharacters;

-- Update an existing player character relationship
UPDATE 
    PlayerCharacters 
SET 
    track_player = '${player_id}', 
    track_character = '${character_id}' 
WHERE 
    track_player = '${prev_player_id}' 
AND 
    track_character = '${prev_character_id}';

-- Delete a player character relationship
DELETE FROM 
    PlayerCharacters 
WHERE 
    track_player = '${player_id}' 
AND 
    track_character = '${character_id}';

/***************************** Players queries *********************************
*/

-- Get all players
SELECT 
    player_id AS 'Player ID', 
    player_name AS 'Player', 
    rank AS 'Rank' 
FROM 
    Players;

-- Insert a new player
INSERT INTO Players 
    (player_name, rank) 
VALUES 
    ('${player_name_input}', '${rank_input}');

-- Update an existing player
UPDATE 
    Players 
SET 
    player_name = '${new_player_name}', 
    rank = '${new_rank}' 
WHERE 
    player_id = '${player_id}';

-- Delete a player
DELETE FROM 
    Players 
WHERE 
    player_id = '${player_id_input}';
    