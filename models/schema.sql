-- DB to store users email, name, password --
DROP DATABASE IF EXISTS users_db;
CREATE DATABASE users_db;

-- Table for user info -- 
CREATE TABLE users (
    id int(11) NOT NULL AUTO_INCREMENT,
    first_name varchar(100) COLLATE utf8_unicode_ci NOT NULL,
    last_name varchar(100) COLLATE utf8_unicode_ci NOT NULL,
    email varchar(100) COLLATE utf8_unicode_ci NOT NULL,
    password varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    created datetime NOT NULL,
    modified datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- DB to store unique group id's and users --
DROP DATABASE IF EXISTS groups_db;
CREATE DATABASE groups_db;
