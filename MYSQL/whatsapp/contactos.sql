CREATE TABLE contactos (
	contacto_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    usuario_contacto_id INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY  (usuario_contacto_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    UNIQUE(usuario_id, usuario_contacto_id)
)