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

-- Creacion de la tabla donantes
create table `donantes`(
    `id` INT NOT NULL,
    `nombre` VARCHAR(100),
    `apellido` VARCHAR(100),
    `cedula` VARCHAR(150),
    `telefono` INT(12),
    `sexo` BOOLEAN,
    `correo` VARCHAR(100),
    `direccion` LONGTEXT,
);

-- Creación de tabla con información de donantes
create table `formularios`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `ultima_donacion` VARCHAR(100),
    `ultimo_tatuaje` VARCHAR(100),
    `enfermedad` VARCHAR(150),
    `estatus` BOOLEAN,
    `fechaDonacion` DATE,
    `pregunta1` BOOLEAN, 
    `pregunta2` BOOLEAN, 
    `pregunta3` BOOLEAN, 
    `pregunta4` BOOLEAN, 
    `pregunta5` BOOLEAN, 
    `pregunta6` BOOLEAN, 
    `pregunta7` BOOLEAN, 
    `pregunta8` BOOLEAN, 
    `pregunta9` BOOLEAN, 
    `pregunta10` BOOLEAN, 
    `pregunta11` BOOLEAN, 
    `pregunta12` BOOLEAN, 
    `pregunta13` BOOLEAN, 
    `pregunta14` BOOLEAN, 
    `pregunta15` BOOLEAN, 
    `pregunta16` BOOLEAN, 
    `pregunta17` BOOLEAN, 
    `pregunta18` BOOLEAN, 
    `pregunta19` BOOLEAN, 
    `pregunta20` BOOLEAN, 
    `pregunta21` BOOLEAN,
    `donante_id` INT,
    `createdAt` DATE,
    `updatedAt` DATE,
    PRIMARY KEY(`id`)
);