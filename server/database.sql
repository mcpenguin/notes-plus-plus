CREATE DATABASE notespp;
CREATE table users (id BIGSERIAL PRIMARY KEY NOT NULL,  uid VARCHAR(200) NOT NULL, password VARCHAR(200) NOT NULL, UNIQUE (uid));