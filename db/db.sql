-- Creacion de la base de datos
create schema `gedovoldb`;

-- Uso de la base de datos del proyecto
use gedovoldb;

-- Creacion de la tabla usuarios
create table `usuarios`(
    `id` INT NOT NULL,
    `usuario` VARCHAR(100),
    `cedula` VARCHAR(150),
    `password` LONGTEXT,
    `rol` VARCHAR(100),
    `token` TEXT,
    `confirmado` BOOLEAN,
    `createdAt` DATE, 
    `updatedAt` DATE
);