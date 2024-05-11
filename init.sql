CREATE DATABASE IF NOT EXISTS db_projet_dev;

USE db_projet_dev;

CREATE TABLE IF NOT EXISTS db_projet_dev.users (
    user_id UUID DEFAULT UUID() PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(62) NOT NULL,
    is_admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS db_projet_dev.sites (
    site_id UUID DEFAULT UUID() PRIMARY KEY,
    name VARCHAR(30) UNIQUE,
    host VARCHAR(15),
    port VARCHAR(5),
    tcp_port VARCHAR(5) UNIQUE,
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS db_projet_dev.sites_users (
    site_id UUID NOT NULL,
    user_id UUID NOT NULL,
    FOREIGN KEY (site_id) REFERENCES sites(site_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS db_projet_dev.images (
    image_id UUID DEFAULT UUID() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    path TEXT NOT NULL,
    section_name VARCHAR(50) NOT NULL,
    site_id UUID NOT NULL,
    FOREIGN KEY (site_id) REFERENCES sites(site_id)
);

CREATE TABLE IF NOT EXISTS db_projet_dev.texts (
    text_id UUID DEFAULT UUID() PRIMARY KEY,
    content TEXT NOT NULL,
    section_name VARCHAR(50) NOT NULL,
    site_id UUID NOT NULL,
    FOREIGN KEY (site_id) REFERENCES sites(site_id)
);

INSERT INTO users (user_id, first_name, last_name, email, password_hash, is_admin) VALUES ('508901a7-817a-454d-824f-27baa4120c33','admin', 'istrateur', 'admin@admin', '$2b$10$r2IamA9904eXVCLDUuRNNewa6RApeuLv9.fkpipyfuQ38Eq9fEEHy', True);