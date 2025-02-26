/****************************************************************
    File Name: create_db.sql
    Group: 88
    Authors: Zyan Shull-Bain, Mo Yongkang
    Date-Last-Modi: 2/5/2025
    Description:
            This file creates the tables for the marvel database
            system.
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
    alliances_id INT AUTO_INCREMENT PRIMARY KEY,
    alliances_name VARCHAR(55) NOT NULL,
    stat_boost DECIMAL(30,2) NOT NULL,
    stat_boost_type VARCHAR(45) NOT NULL
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
    FOREIGN KEY (track_alliance) REFERENCES Alliances(alliances_id) ON DELETE SET NULL ON UPDATE CASCADE
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
