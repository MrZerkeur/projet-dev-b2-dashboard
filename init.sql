use db_projet_dev;

CREATE table if not exists db_projet_dev.users (
	user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	first_name varchar(30) not null,
	name varchar(50) not null,
	mail varchar(100) unique not null,
	password_hash varchar(62) not null,
	salt varchar(15) not null
);

CREATE table if not exists db_projet_dev.sites (
	site_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name varchar(30),
	user_id integer,
	foreign key (user_id) references users(user_id)
);

CREATE table if not exists db_projet_dev.pictures (
	picture_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name varchar(30)not null,
	image_path text not null,
	section_name varchar(50) not null,
	site_id integer,
	foreign key (site_id) references sites(site_id)
);

CREATE table if not exists db_projet_dev.texts (
	text_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	content text not null,
	section_name varchar(50) not null,
	site_id integer,
	foreign key (site_id) references sites(site_id)
);

INSERT INTO db_projet_dev.users 
(first_name, name, mail, password_hash, salt) 
values ("axel", "Broquaire", "test@gmail.com", "test", "aze");
INSERT INTO db_projet_dev.users 
(first_name, name, mail, password_hash, salt) 
values ("test1", "test1", "test1@gmail.com", "test", "aze");
INSERT INTO db_projet_dev.users 
(first_name, name, mail, password_hash, salt) 
values ("test2", "test2", "test2@gmail.com", "test", "aze");