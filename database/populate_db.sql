/****************************************************************
    File Name: populate_db.sql
    Group: 88
    Authors: Zyan Shull-Bain, Mo Yongkang
    Date-Last-Modi: 2/5/2025
    Description:
            This file populates our marvel database with player,
            character, and battle information.
****************************************************************/

-- Insert data into the Alliances table
INSERT INTO Alliances (alliances_name, stat_boost, stat_boost_type)
VALUES
    ('Symbiote Bond', 15.00, 'Attack Power'),
    ('Gamma Charge', 20.00, 'Health Boost'),
    ('Ammo Overload', 25.00, 'Attack Power'),
    ('Lunar Focus', 15.00, 'Healing Boost');

-- Insert data into Players table
INSERT INTO Players (player_name, rank) 
VALUES
    ('Zyverous', 'Diamond'),
    ('MasterMo', 'Celestial'),
    ('GamerDad', 'Gold');

-- Insert data into Characters table (with correct foreign key reference to Alliances)
INSERT INTO Characters (character_name, role, health, has_secondary_weapon, move_speed, critical_multiplier, ammo_capacity, track_alliance) 
VALUES
    ('Iron Man', 'Duelist', 275, 0, 10, NULL, 8, (SELECT alliances_id FROM Alliances WHERE alliances_name = 'Gamma Charge')),
    ('Venom', 'Vanguard', 650, 0, 15, 15, NULL, (SELECT alliances_id FROM Alliances WHERE alliances_name = 'Symbiote Bond')),
    ('Rocket', 'Strategist', 250, 1, 15, 25, 30, (SELECT alliances_id FROM Alliances WHERE alliances_name = 'Ammo Overload'));

-- Insert data into Abilities table (with correct foreign key reference to Characters)
INSERT INTO Abilities (ability_name, special_effect, ability_range, cooldown, duration, charges, track_character) 
VALUES
    ('Hyper-Velocity', 'Activate Hyper-Velocity state for swift forward flight', 0, 8, 5, 1, (SELECT character_id FROM Characters WHERE character_name = 'Iron Man')),
    ('Symbiotic Resilience', 'Laungh webbing forward, allowing for a singluar swing in desired direction', 100, 10, 0, 0, (SELECT character_id FROM Characters WHERE character_name = 'Venom')),
    ('Jetpack Dash', 'Dash forward', 0, 7, 1, 2, (SELECT character_id FROM Characters WHERE character_name = 'Rocket')),
    ('Battle Rebirth Beacon', 'Deploy beacon to revive fallen ally and periodically drops armor packs', 50, 45, 100, 1, (SELECT character_id FROM Characters WHERE character_name = 'Rocket'));

-- Insert data into Battles table
INSERT INTO Battles (time_stamp, is_victory, kills, deaths, assists, damage_dealt, damage_blocked, healing, accuracy) 
VALUES
    ('2025-02-05 15:30:00', 1, 45, 2, 3, 100000, 5000, 2000, 51),
    ('2025-02-05 16:00:00', 0, 3, 14, 2, 800, 3000, 1000, 5),
    ('2025-02-05 16:30:00', 1, 6, 1, 44, 2500, 7000, 5570, 90);

-- Insert data into BattleParticipants table (with correct foreign key references to Battles and Characters)
INSERT INTO BattleParticipants (track_battle, track_character) 
VALUES
    ((SELECT battle_id FROM Battles WHERE time_stamp = '2025-02-05 15:30:00'), (SELECT character_id FROM Characters WHERE character_name = 'Iron Man')),
    ((SELECT battle_id FROM Battles WHERE time_stamp = '2025-02-05 15:30:00'), (SELECT character_id FROM Characters WHERE character_name = 'Venom')),
    ((SELECT battle_id FROM Battles WHERE time_stamp = '2025-02-05 15:30:00'), (SELECT character_id FROM Characters WHERE character_name = 'Rocket')),
    ((SELECT battle_id FROM Battles WHERE time_stamp = '2025-02-05 16:00:00'), (SELECT character_id FROM Characters WHERE character_name = 'Iron Man')),
    ((SELECT battle_id FROM Battles WHERE time_stamp = '2025-02-05 16:30:00'), (SELECT character_id FROM Characters WHERE character_name = 'Venom'));

-- Insert data into PlayerBattles table (with correct foreign key references to Battles and Players)
INSERT INTO PlayerBattles (track_battle, track_player) 
VALUES
    ((SELECT battle_id FROM Battles WHERE time_stamp = '2025-02-05 15:30:00'), (SELECT player_id FROM Players WHERE player_name = 'Zyverous')),
    ((SELECT battle_id FROM Battles WHERE time_stamp = '2025-02-05 15:30:00'), (SELECT player_id FROM Players WHERE player_name = 'MasterMo')),
    ((SELECT battle_id FROM Battles WHERE time_stamp = '2025-02-05 16:00:00'), (SELECT player_id FROM Players WHERE player_name = 'GamerDad')),
    ((SELECT battle_id FROM Battles WHERE time_stamp = '2025-02-05 16:30:00'), (SELECT player_id FROM Players WHERE player_name = 'Zyverous'));

-- Insert data into PlayerCharacters table (with correct foreign key references to Players and Characters)
INSERT INTO PlayerCharacters (track_player, track_character) 
VALUES
    ((SELECT player_id FROM Players WHERE player_name = 'Zyverous'), (SELECT character_id FROM Characters WHERE character_name = 'Iron Man')),
    ((SELECT player_id FROM Players WHERE player_name = 'MasterMo'), (SELECT character_id FROM Characters WHERE character_name = 'Venom')),
    ((SELECT player_id FROM Players WHERE player_name = 'GamerDad'), (SELECT character_id FROM Characters WHERE character_name = 'Rocket')),
    ((SELECT player_id FROM Players WHERE player_name = 'Zyverous'), (SELECT character_id FROM Characters WHERE character_name = 'Rocket'));


-- Select all from Alliances table
SELECT * FROM Alliances;

-- Select all from Players table
SELECT * FROM Players;

-- Select all from Characters table
SELECT * FROM Characters;

-- Select all from Abilities table
SELECT * FROM Abilities;

-- Select all from Battles table
SELECT * FROM Battles;

-- Select all from BattleParticipants table
SELECT * FROM BattleParticipants;

-- Select all from PlayerBattles table
SELECT * FROM PlayerBattles;

-- Select all from PlayerCharacters table
SELECT * FROM PlayerCharacters;