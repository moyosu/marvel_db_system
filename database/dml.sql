/*
 ***************************** INSERT *********************************
 */
-- Insert a new player
INSERT INTO
    Players (player_name, rank)
VALUES
    (:player_name_input, :rank_input);

-- Insert a new alliance
INSERT INTO
    Alliances (alliance_name, stat_boost, stat_boost_type)
VALUES
    (
        :alliance_name_input,
        :stat_boost_input,
        :stat_boost_type_input
    );

-- Insert a new character
INSERT INTO
    Characters (
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
        :character_name_input,
        :role_input,
        :health_input,
        :has_secondary_weapon_input,
        :move_speed_input,
        :critical_multiplier_input,
        :ammo_capacity_input,
        :track_alliance_input
    );

-- Insert a new ability
INSERT INTO
    Abilities (
        ability_name,
        special_effect,
        ability_range,
        cooldown,
        duration,
        charges,
        track_character
    )
VALUES
    (
        :ability_name_input,
        :special_effect_input,
        :ability_range_input,
        :cooldown_input,
        :duration_input,
        :charges_input,
        :track_character_input
    );

-- Insert a new battle
INSERT INTO
    Battles (
        time_stamp,
        is_victory,
        kills,
        deaths,
        assists,
        damage_dealt,
        damage_blocked,
        healing,
        accuracy
    )
VALUES
    (
        :time_stamp_input,
        :is_victory_input,
        :kills_input,
        :deaths_input,
        :assists_input,
        :damage_dealt_input,
        :damage_blocked_input,
        :healing_input,
        :accuracy_input
    );

-- Insert a new battle participant
INSERT INTO
    BattleParticipants (track_battle, track_character)
VALUES
    (:track_battle_input, :track_character_input);

-- Insert a new player battle record
INSERT INTO
    PlayerBattles (track_battle, track_player)
VALUES
    (:track_battle_input, :track_player_input);

-- Insert a new player character assignment
INSERT INTO
    PlayerCharacters (track_player, track_character)
VALUES
    (:track_player_input, :track_character_input);

/*
 ***************************** UPDATE *********************************
 */
-- Update a player
UPDATE
    Players
SET
    player_name = :new_player_name,
    rank = :new_rank
WHERE
    player_id = :player_id_input;

-- Update a character
UPDATE
    Characters
SET
    character_name = :new_character_name,
    role = :new_role,
    health = :new_health,
    has_secondary_weapon = :new_has_secondary_weapon,
    move_speed = :new_move_speed,
    critical_multiplier = :new_critical_multiplier,
    ammo_capacity = :new_critical_multiplier
WHERE
    character_id = :character_id_input;

-- Update an alliance
UPDATE
    Alliances
SET
    alliance_name = :new_alliance_name,
    stat_boost = :new_stat_boost,
    stat_boost_type = :new_stat_boost_type
WHERE
    alliance_id = :alliance_id_input;

-- Update an ability
UPDATE
    Abilities
SET
    ability_name = :new_ability_name,
    special_effect = :new_special_effect,
    ability_range = :new_ability_range,
    cooldown = :new_cooldown,
    duration = :new_duration,
    charges = :new_charges,
    track_character = :new_track_character
WHERE
    ability_id = :ability_id_input;

-- Update a battle's results
UPDATE
    Battles
SET
    time_stamp = :new_time_stamp,
    is_victory = :new_is_victory,
    kills = :new_kills,
    deaths = :new_deaths,
    assists = :new_assists,
    damage_dealt = :new_damage_dealt,
    damage_blocked = :new_damage_blocked,
    healing = :new_healing,
    accuracy = :new_accuracy
WHERE
    battle_id = :battle_id_input;

-- Update a battle participant
UPDATE
    BattleParticipants
SET
    track_battle = :new_track_battle,
    track_character = :new_track_character
WHERE
    track_battle = :old_track_battle_input
    AND track_character = :old_track_character_input;

-- Update a player character
UPDATE
    PlayerCharacters
SET
    track_player = :new_track_player,
    track_character = :new_track_character
WHERE
    track_player = :old_track_player_input
    AND track_character = :old_track_character_input;

-- Update a player battle
UPDATE
    PlayerBattles
SET
    track_player = :new_track_player,
    track_battle = :new_track_battle
WHERE
    track_player = :old_track_player_input
    AND track_battle = :old_track_battle_input;

/*
 ***************************** DELETE *********************************
 */
-- Delete a player
DELETE FROM
    Players
WHERE
    player_id = :player_id_input;

-- Delete a character
DELETE FROM
    Characters
WHERE
    character_id = :character_id_input;

-- Delete an alliance
DELETE FROM
    Alliances
WHERE
    alliance_id = :alliance_id_input;

-- Delete an ability
DELETE FROM
    Abilities
WHERE
    ability_id = :ability_id_input;

-- Delete a battle record
DELETE FROM
    Battles
WHERE
    battle_id = :battle_id_input;

-- Delete a player character
DELETE FROM
    PlayerCharacters
WHERE
    track_player = :player_id_input
    AND track_character = :character_id_input;

-- Delete a play battle
DELETE FROM
    PlayerBattles
WHERE
    track_player = :player_id_input
    AND track_battle = :battle_id_input;

-- Delete a battle participant
DELETE FROM
    BattleParticipants
WHERE
    track_battle = :battle_id_input
    AND track_character = :character_id_input;

/*
 ***************************** SELECT *********************************
 */
-- Get all Characters
SELECT
    character_id as 'Character ID',
    character_name as 'Character',
    role as 'Role',
    health as 'Health',
    IF(has_secondary_weapon = 1, 'true', 'false') AS 'Has Secondary Weapon',
    move_speed as 'Move Speed',
    critical_multiplier as 'Critical Multiplier',
    ammo_capacity as 'Ammo Capacity',
    Alliances.alliance_name as 'Alliance'
FROM
    Characters
    JOIN Alliances ON Characters.track_alliance = Alliances.alliance_id;

-- Get all Players
SELECT
    player_id as 'Player ID',
    player_name as 'Player',
    rank as 'Rank'
FROM
    Players;

-- Get all Battles;
SELECT
    battle_id as 'Battle ID',
    time_stamp as 'Time Stamp',
    IF(is_victory = 1, 'true', 'false') AS 'Victory',
    kills as 'Kills',
    deaths as 'Deaths',
    assists as 'Assists',
    damage_dealt as 'Damage Dealt',
    damage_blocked as 'Damage Blocked',
    healing as 'Healing',
    accuracy as 'Accuracy'
FROM
    Battles;

-- Get all Abilities with associated Characters
SELECT
    ability_id as 'Ability ID',
    ability_name as 'Ability',
    special_effect as 'Special Effect',
    ability_range as 'Range',
    cooldown as 'Cooldown',
    charges as 'Charges',
    Characters.character_name as 'Character'
FROM
    Abilities
    JOIN Characters ON Abilities.track_character = Characters.character_id;

-- Get all Alliances
SELECT
    alliance_id as 'Alliance ID',
    alliance_name as 'Alliance',
    stat_boost as 'Stat Boost',
    stat_boost_type as 'Stat Boost Type'
FROM
    Alliances;

-- Get all BattleParticipants
SELECT
    track_battle as 'Battle ID',
    Characters.character_name as 'Character'
FROM
    BattleParticipants
    JOIN Characters ON BattleParticipants.track_character = Characters.character_id
ORDER BY
    track_battle;

-- Get all PlayerBattles
SELECT
    Players.player_name as 'Player',
    track_battle as 'Battle ID'
FROM
    PlayerBattles
    JOIN Players ON PlayerBattles.track_player = Players.player_id;

-- Get all PlayerCharacters
SELECT
    Players.player_name as 'Player',
    Characters.character_name as 'Character'
FROM
    PlayerCharacters
    JOIN Players ON PlayerCharacters.track_player = Players.player_id
    JOIN Characters ON PlayerCharacters.track_character = Characters.character_id;

/*
 ***************************** Miscellaneous SELECT *********************************
 */
-- Get all Characters with their name, role, and alliance
SELECT
    character_name,
    role,
    Alliances.alliance_name as alliance
FROM
    Characters
    JOIN Alliances ON Alliances.alliance_id = Characters.track_alliance;

-- Get all Players with their rank
SELECT
    player_name as Player,
    rank
from
    Players;

-- Get Battles with players involved.
SELECT
    battle_id,
    Players.player_name as player,
    time_stamp,
    is_victory,
    kills,
    deaths,
    assists,
    damage_dealt,
    damage_blocked,
    healing,
    accuracy
FROM
    Battles
    JOIN PlayerBattles ON Battles.battle_id = PlayerBattles.track_battle
    JOIN Players ON PlayerBattles.track_player = Players.player_id
ORDER BY
    battle_id;