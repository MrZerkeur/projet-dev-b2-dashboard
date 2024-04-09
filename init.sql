CREATE DATABASE IF NOT EXISTS db_projet_dev;

USE db_projet_dev;

CREATE TABLE IF NOT EXISTS db_projet_dev.users (
    user_id UUID DEFAULT UUID() PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(62) NOT NULL,
    salt VARCHAR(15) NOT NULL
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

INSERT INTO db_projet_dev.users 
(first_name, last_name, email, password_hash, salt) 
values ("axel", "Broquaire", "test@gmail.com", "test", "aze");
INSERT INTO db_projet_dev.users 
(first_name, last_name, email, password_hash, salt) 
values ("test1", "test1", "test1@gmail.com", "test", "aze");
INSERT INTO db_projet_dev.users 
(first_name, last_name, email, password_hash, salt) 
values ("test2", "test2", "test2@gmail.com", "test", "aze");


INSERT INTO db_projet_dev.sites (name, host, port, user_id)
SELECT 'site_1', '1.1.1.1', '10', user_id
FROM db_projet_dev.users 
WHERE email = 'test@gmail.com';

INSERT INTO db_projet_dev.sites (name, host, port, user_id)
SELECT 'site_2', '2.2.2.2', '20', user_id
FROM db_projet_dev.users 
WHERE email = 'test1@gmail.com';

INSERT INTO db_projet_dev.sites (name, host, port, user_id)
SELECT 'site_3', '3.3.3.3', '30', user_id
FROM db_projet_dev.users 
WHERE email = 'test1@gmail.com';

INSERT INTO db_projet_dev.sites (name, host, port, user_id)
SELECT 'site_4', '4.4.4.4', '40', user_id
FROM db_projet_dev.users 
WHERE email = 'test2@gmail.com';


INSERT INTO db_projet_dev.texts (content, section_name, site_id)
SELECT 'test2', 'test2', sites.site_id
FROM db_projet_dev.sites 
INNER JOIN db_projet_dev.users ON sites.user_id = users.user_id
WHERE users.email = 'test1@gmail.com';

INSERT INTO db_projet_dev.texts (content, section_name, site_id)
SELECT 'test2', 'test2', sites.site_id
FROM db_projet_dev.sites 
INNER JOIN db_projet_dev.users ON sites.user_id = users.user_id
WHERE users.email = 'test1@gmail.com';


INSERT INTO db_projet_dev.images (name, section_name, site_id, image_path) 
SELECT 'test1.jpg', 'test1', site_id, CONCAT(site_id, '/', 'test1', '/', 'test1.jpg')
FROM db_projet_dev.sites
INNER JOIN db_projet_dev.users ON sites.user_id = users.user_id
WHERE users.email = 'test@gmail.com';

INSERT INTO db_projet_dev.images (name, section_name, site_id, image_path) 
SELECT 'test2.jpg', 'test2', site_id, CONCAT(site_id, '/', 'test2', '/', 'test2.jpg')
FROM db_projet_dev.sites
INNER JOIN db_projet_dev.users ON sites.user_id = users.user_id
WHERE users.email = 'test@gmail.com';