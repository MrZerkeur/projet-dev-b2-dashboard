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
    name VARCHAR(30),
    host VARCHAR(15),
    port VARCHAR(5),
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
    image_path TEXT NOT NULL,
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