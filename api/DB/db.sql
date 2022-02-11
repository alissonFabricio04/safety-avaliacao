/* Criação do banco */
create database safety_db;

/* Criação da tabela */
create table contact (
    id integer AUTO_INCREMENT,
	name varchar(50) NULL,
    mail varchar(100) NULL,
    phone varchar(20) NULL,
    cep varchar(10) NULL,
    address_number integer NULL,
    state varchar(30) NULL,
	city varchar(50) NULL,
    address varchar(50) NULL,
    created_at datetime NOT NULL,
    PRIMARY KEY (id)
);