/****************************************************************
    File Section: 1 - Create DB tables
    Group: 88
    Authors: Zyan Shull-Bain, Yongkang Mo
    Date: 2/6/2025
    Description:
            This file creates the tables for the Marvel Database
            System.
****************************************************************/

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Clear out exitsing tables
DROP TABLE IF EXISTS PlayerCharacters;
DROP TABLE IF EXISTS PlayerBattles;
DROP TABLE IF EXISTS BattleParticipants;
DROP TABLE IF EXISTS Battles;
DROP TABLE IF EXISTS Players;
DROP TABLE IF EXISTS Characters;
DROP TABLE IF EXISTS Abilities;
DROP TABLE IF EXISTS Alliances;

-- Players Table
CREATE TABLE Players (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(145) NOT NULL,
    rank VARCHAR(45) NOT NULL
);

-- Alliances Table
CREATE TABLE Alliances (
    alliance_id INT AUTO_INCREMENT PRIMARY KEY,
    alliance_name VARCHAR(55) NOT NULL,
    stat_boost DECIMAL(30,2) NOT NULL,
    stat_boost_type VARCHAR(45) NOT NULL
);

-- Characters Table
CREATE TABLE Characters (
    character_id INT AUTO_INCREMENT PRIMARY KEY,
    character_name VARCHAR(100) NOT NULL,
    role VARCHAR(45) NOT NULL,
    health INT NOT NULL,
    has_secondary_weapon TINYINT(1) NOT NULL DEFAULT 0,
    move_speed INT NOT NULL,
    critical_multiplier FLOAT NOT NULL,
    ammo_capacity INT DEFAULT NULL,
    track_alliance INT,
    FOREIGN KEY (track_alliance) REFERENCES Alliances(alliance_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Abilities Table
CREATE TABLE Abilities (
    ability_id INT AUTO_INCREMENT PRIMARY KEY,
    ability_name VARCHAR(45) NOT NULL,
    special_effect VARCHAR(145) NOT NULL,
    ability_range INT NOT NULL DEFAULT 0,
    cooldown INT NOT NULL DEFAULT 0,
    duration INT NOT NULL DEFAULT 0,
    charges INT DEFAULT NULL,
    track_character INT NOT NULL,
    FOREIGN KEY (track_character) REFERENCES Characters(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Battles Table
CREATE TABLE Battles (
    battle_id INT AUTO_INCREMENT PRIMARY KEY,
    time_stamp DATETIME NOT NULL,
    is_victory TINYINT(1) NOT NULL,
    kills INT NOT NULL DEFAULT 0,
    deaths INT NOT NULL DEFAULT 0,
    assists INT NOT NULL DEFAULT 0,
    damage_dealt BIGINT NOT NULL DEFAULT 0,
    damage_blocked BIGINT NOT NULL DEFAULT 0,
    healing BIGINT NOT NULL DEFAULT 0,
    accuracy INT NOT NULL DEFAULT 0
);

-- BattleParticipants Table (Intersection Table)
CREATE TABLE BattleParticipants (
    track_battle INT NOT NULL,
    track_character INT NOT NULL,
    PRIMARY KEY (track_battle, track_character),
    FOREIGN KEY (track_battle) REFERENCES Battles(battle_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (track_character) REFERENCES Characters(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- PlayerBattles Table (Intersection Table)
CREATE TABLE PlayerBattles (
    track_battle INT NOT NULL,
    track_player INT NOT NULL,
    PRIMARY KEY (track_battle, track_player),
    FOREIGN KEY (track_battle) REFERENCES Battles(battle_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (track_player) REFERENCES Players(player_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- PlayerCharacters Table (Intersection Table)
CREATE TABLE PlayerCharacters (
    track_player INT NOT NULL,
    track_character INT NOT NULL,
    PRIMARY KEY (track_player, track_character),
    FOREIGN KEY (track_player) REFERENCES Players(player_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (track_character) REFERENCES Characters(character_id) ON DELETE CASCADE ON UPDATE CASCADE
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

-- Describe Each Table
DESCRIBE Players;
DESCRIBE Alliances;
DESCRIBE Abilities;
DESCRIBE Characters;
DESCRIBE Battles;
DESCRIBE BattleParticipants;
DESCRIBE PlayerBattles;
DESCRIBE PlayerCharacters;

/****************************************************************
    File Section: 2 - Populate tables with data
    Group: 88
    Authors: Zyan Shull-Bain, Yongkang Mo
    Date: 2/6/2025
    Description:
            This file populates our Marvel Database with player,
            character, and battle information.
****************************************************************/

-- Insert data into the Alliances table
INSERT INTO Alliances (alliance_name, stat_boost, stat_boost_type)
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
    ('Iron Man', 'Duelist', 275, 0, 10, NULL, 8, (SELECT alliance_id FROM Alliances WHERE alliance_name = 'Gamma Charge')),
    ('Venom', 'Vanguard', 650, 0, 15, 15, NULL, (SELECT alliance_id FROM Alliances WHERE alliance_name = 'Symbiote Bond')),
    ('Rocket', 'Strategist', 250, 1, 15, 25, 30, (SELECT alliance_id FROM Alliances WHERE alliance_name = 'Ammo Overload'));

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