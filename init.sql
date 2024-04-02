CREATE DATABASE IF NOT EXISTS db_projet_dev;

use db_projet_dev;

CREATE table if not exists db_projet_dev.users (
    user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(30) not null,
    last_name varchar(50) not null,
    email varchar(100) unique not null,
    password_hash varchar(62) not null,
    salt varchar(15) not null
);

CREATE table if not exists db_projet_dev.sites (
    site_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name varchar(30),
    host varchar(15),
    port varchar(5),
    user_id integer not null,
    foreign key (user_id) references users(user_id)
);

CREATE table if not exists db_projet_dev.images (
    image_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name varchar(50)not null,
    image_path text not null,
    section_name varchar(50) not null,
    site_id integer not null,
    foreign key (site_id) references sites(site_id)
);

CREATE table if not exists db_projet_dev.texts (
    text_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    content text not null,
    section_name varchar(50) not null,
    site_id integer not null,
    foreign key (site_id) references sites(site_id)
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

INSERT INTO db_projet_dev.sites (name, host, port, user_id) values ('site_1', '1.1.1.1', '10', 1);
INSERT INTO db_projet_dev.sites (name, host, port, user_id) values ('site_2', '2.2.2.2', '20', 1);
INSERT INTO db_projet_dev.sites (name, host, port, user_id) values ('site_3', '3.3.3.3', '30', 2);
INSERT INTO db_projet_dev.sites (name, host, port, user_id) values ('site_3', '3.3.3.3', '30', 3);

INSERT INTO db_projet_dev.texts (content, section_name, site_id) values ('test', 'test', 1);
INSERT INTO db_projet_dev.texts (content, section_name, site_id) values ('test2', 'test2', 2);

INSERT INTO db_projet_dev.images (name, image_path, section_name, site_id) values ('test.jpg', 'chemin/de/test.jpg', 'test', 1);
INSERT INTO db_projet_dev.images (name, image_path, section_name, site_id) values ('test2.jpg', 'chemin/de/test2.jpg', 'test2', 2);