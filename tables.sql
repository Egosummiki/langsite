/* 
 *  LANGSITE TABLE CONSTRUCTION
 *
 */

CREATE DATABASE langsite;
USE langsite;

-- VERBS

CREATE TABLE verbs (
    id          integer primary key auto_increment,
    name        varchar(64),
    description varchar(256)
);

CREATE TABLE verbs_set_forms (
    id         integer primary key auto_increment,
    verb_id    integer,
    value      varchar(64),
    form_id    integer
);

CREATE TABLE verb_conjugation (
    id          integer primary key auto_increment,
    tense       smallint,
    varriation  smallint,
    code        varchar
);

-- NOUNS

CREATE TABLE nouns (
    id          integer primary key auto_increment,
    name        varchar(80),
    
)


