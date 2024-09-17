CREATE TABLE usuarios (
	usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en DATE DEFAULT CURRENT_DATE
)

INSERT INTO usuarios (`username`,`email`,`password_hash`) VALUES ('pepe', 'pepe@gmail.com', 'pepesito123') 

INSERT INTO usuarios 
(`username`,`email`,`password_hash`) 
VALUES 
('pepe2', 'pepe2@gmail.com', 'pepesito1234'),
('maria', 'maria@gmail.com', 'maria1234')


ALTER TABLE `usuarios` CHANGE `activo` `activo` TINYINT(1) NOT NULL DEFAULT '1';


ALTER TABLE usuarios CHANGE `creado_en` `creado_en` DATE DEFAULT CURRENT_DATE NOT NULL

UPDATE `usuarios` SET `email`='pepe@gmail.com',`password_hash`='pepe123' WHERE usuario_id = 1

DELETE FROM usuarios WHERE usuario_id = 4