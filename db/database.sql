set global max_allowed_packet=1000000000;

CREATE DATABASE IF NOT EXISTS primicia;

USE primicia;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    super_admin BOOLEAN NOT NULL
);
DESCRIBE usuarios;

CREATE TABLE IF NOT EXISTS preguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta TEXT NOT NULL,
    respuesta TEXT NOT NULL
);
DESCRIBE preguntas;

CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    motivo VARCHAR(60) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(80) NOT NULL,
    mensaje VARCHAR(250) NOT NULL,
    fecha DATE NOT NULL
);
DESCRIBE contacto;

CREATE TABLE IF NOT EXISTS tarjeta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(80) NOT NULL,
    telefono VARCHAR(60) NOT NULL,
    domicilio VARCHAR(70) NOT NULL,
    ciudad VARCHAR(60) NOT NULL,
    dni VARCHAR(60) NOT NULL,
    ingresos VARCHAR(60) NOT NULL,
    filial VARCHAR(70) NOT NULL,
    mensaje VARCHAR(250) NOT NULL,
    fecha DATE NOT NULL
);
DESCRIBE tarjeta;

CREATE TABLE IF NOT EXISTS tasas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tasaTitulo VARCHAR(100) NOT NULL,
    tasaDescripcion TEXT NOT NULL,
    tna DECIMAL(10, 2) NOT NULL,
    tem DECIMAL(10, 2) NOT NULL,
    cft DECIMAL(10, 2) NOT NULL
);
DESCRIBE tasas;

CREATE TABLE IF NOT EXISTS tasas_fecha_actualizacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_actualizacion DATE NOT NULL
);
DESCRIBE tasas_fecha_actualizacion;

CREATE TABLE IF NOT EXISTS comisiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comisionTitulo VARCHAR(100) NOT NULL,
    comisionImporte TEXT NOT NULL,
);
DESCRIBE comisiones;


CREATE TABLE IF NOT EXISTS filiales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    localidad VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    email VARCHAR(80) NOT NULL,
    telefono VARCHAR(60) NOT NULL,
    receptoria BOOLEAN NOT NULL DEFAULT FALSE
);
DESCRIBE filiales;

CREATE TABLE IF NOT EXISTS categoria_comercio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(140) NOT NULL
);
DESCRIBE categoria_comercio;

CREATE TABLE IF NOT EXISTS promociones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    diasPromocion TEXT NOT NULL,
    promocion TEXT NOT NULL,
    texto TEXT NULL,
    image LONGTEXT NULL
);
DESCRIBE promociones;


CREATE TABLE IF NOT EXISTS comercios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoriaId INT NOT NULL,
    nombre VARCHAR(120) NOT NULL,
    direccion VARCHAR(140) NOT NULL,
    filialId INT NOT NULL,
    promocionId INT NOT NULL,
    FOREIGN KEY (categoriaId) REFERENCES categoria_comercio(id),
    FOREIGN KEY (filialId) REFERENCES filiales(id),
    FOREIGN KEY (promocionId) REFERENCES promociones(id)
);
DESCRIBE comercios;


CREATE TABLE IF NOT EXISTS costo_financiero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    percentage DECIMAL (10, 2) NOT NULL
);
DESCRIBE costo_financiero;


INSERT INTO preguntas VALUES
    (1, '¿Qué tipo de estructura jurídica tiene Primicia?', 'Ualá es una empresa constituida de acuerdo a la legislación de la República Argentina como una Sociedad Anónima Unipersonal (SAU). Está inscripta en el Registro Público de Comercio de la Ciudad Autónoma de Buenos Aires y cumple con todas las obligaciones impuestas por Ley para funcionar como tal.'),
    (2, '¿Cómo protege Primicias los datos de usuarios?', 'Ejemplo de respuesta'),
    (3, '¿Qué puedo comprar con la tarjeta virtual de Primicia?', 'Ejemplo de respuesta'),
    (4, '¿Cuál es la diferencia entre la tarjeta virtual y la física?', 'Ejemplo de respuesta'),
    (5, '¿Cómo solicito la tarjeta Primicia?', 'Ejemplo de respuesta'),
    (6, '¿Puedo bloquear mi tarjeta virtual de Primicia?', 'Ejemplo de respuesta'),

INSERT INTO tasas VALUES
    (1, 'TASA DE INTERES – FINANCIACION', 'Comienza a aplicarse en la fecha de vencimiento del resumen, en el caso que deba financiar saldo.', 128.20, 10.54, 238.32 ),
    (2, 'TASA DE INTERES – PUNITORIOS', 'Comienza a aplicarse en la fecha de vencimiento del resumen, en el caso de no haber abonado el pago mínimo.', 64.10, 5.27, 119.16 ),
    (3, 'TASA DE INTERES – ADELANTOS EN EFECTIVO', 'Comienza a aplicarse desde la fecha en la que se realiza el adelanto en efectivo', 128.20, 10.54, 238.32 )

INSERT INTO tasas VALUES
(1, CURRENT_DATE)

INSERT INTO filiales VALUES
    (1, 'Venado Tuerto', 'Mitre 664', 'venadotuerto@tarjetaprimicia.com.ar', '03462 430655'),
    (2, 'Rufino', 'España 247', 'rufino@tarjetaprimicia.com.ar', '03382 420300'),
    (3, 'Villa Cañas', 'Av. 50 y Calle 57', 'villacañas@tarjetaprimicia.com.ar', '03462 451867'),
    (4, 'San Gregorio', 'San Martín 865', 'sangregorio@tarjetaprimicia.com.ar', '03382 471031'),
    (5, 'Firmat', 'Córdoba y  Alberdi', 'firmat@tarjetaprimicia.com.ar', '03465 424545'),
    (6, 'San Nicolás', 'Urquiza 39', 'sannicolas@tarjetaprimicia.com.ar', '0336 4437333'),
    (7, 'Villa Constitución', 'Eva Perón 432', 'villaconstitucion@tarjetaprimicia.com.ar', '03400 471500'),
    (8, 'Villa Ramallo', 'Av. San Martín 25', 'villaramallo@tarjetaprimicia.com.ar', '03407 480489'),
    (9, 'Elortondo', 'San Martín 1088', 'elortondo@tarjetaprimicia.com.ar', ''),
    (10, 'Santa Isabel', 'Mitre 1267', 'santaisabel@tarjetaprimicia.com.ar', ''),
    (11, 'María Teresa', 'General López 516', 'mariateresa@tarjetaprimicia.com.ar', ''),
    (12, 'Sancti Spíritu', 'L. de la Torre 258', 'sanctispiritu@tarjetaprimicia.com.ar', ''),
    (13, 'Teodelina', 'José Roberti 414', 'teodelina@tarjetaprimicia.com.ar', ''),
    (14, 'Carmen', 'Sarmiento 420', 'carmen@tarjetaprimicia.com.ar', '')

INSERT INTO promociones VALUES
    (1, '2023-11-10', '2023-11-30', 'Jueves y Viernes',  '3 cuotas + 15%', 'JUEVES Y VIERNES 3 CUOTAS + 15% DESCUENTO. Fecha de Inicio: 01/01/2023. Fecha de Finalización: 30/09/2023.' )

INSERT INTO categoria_comercio VALUES
    (1, 'Agencias de turismo' ),
    (2, 'Accesorios y repuestos' ),
    (3, 'Alineación y Balanceo' ),
    (4, 'Artículos para el Hogar' ),
    (5, 'Artículos de vestir bebes - niños' ),
    (6, 'Artículos para deportes' )

INSERT INTO comercios VALUES
    (1, 1, 'Olivera Viajes', 'Catamarca 72', 2, 1 )

INSERT INTO comisiones VALUES
    (1, 'COMISIÓN SERVICIO RENOVAC. TARJ. TITULAR', 'BONIFICADO' ),
    (2, 'COMISIÓN SERVICIO RENOVAC. TARJ. ADICIONAL', 'BONIFICADO' ),
    (3, 'COMISIÓN REPOSICION O REIMPRESIÓN TARJETA (extravío, robo, hurto, rotura)', '$ 2.400,00' ),
    (4, 'CARGO SERVICIO ASISTENCIA MEDICA EN VIAJE', 'BONIFICADO' ),
    (5, 'COMISIÓN MANTENIMIENTO DE CUENTA', '$ 950,00' ),
    (6, 'COMISIÓN BENEFICIOS ESPECIALES', '$ 380,00' ),
    (7, 'CARGO GESTION COBRANZA 1', '$ 600,00' ),
    (8, 'CARGO GESTION COBRANZA 2', '$ 900,00' )


DELIMITER //

CREATE TRIGGER update_fecha_tasa
AFTER UPDATE ON tasas
FOR EACH ROW
BEGIN
    UPDATE tasas_fecha_actualizacion 
    SET fecha_actualizacion = CURRENT_DATE
    WHERE id = 1;
END;
//

DELIMITER ;

--  *** COMENTARIOS **
-- Limitar input mensaje con max 250 caracteres