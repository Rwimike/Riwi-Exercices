-- Eliminar tablas existentes
DROP TABLE IF EXISTS citas;
DROP TABLE IF EXISTS pacientes;
DROP TABLE IF EXISTS medicos;
DROP TABLE IF EXISTS especialidades;
DROP TABLE IF EXISTS ubicaciones;
DROP TABLE IF EXISTS metodos_pago;
DROP TABLE IF EXISTS estatus_cita;

-- Crear tablas
CREATE TABLE pacientes (
    id_paciente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE especialidades (
    id_especialidad SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE medicos (
    id_medico SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    id_especialidad INTEGER REFERENCES especialidades(id_especialidad)
);

CREATE TABLE ubicaciones (
    id_ubicacion SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE metodos_pago (
    id_metodo_pago SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE estatus_cita (
    id_estatus SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE citas (
    id_cita SERIAL PRIMARY KEY,
    id_paciente INTEGER NOT NULL REFERENCES pacientes(id_paciente),
    id_medico INTEGER NOT NULL REFERENCES medicos(id_medico),
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    motivo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    id_ubicacion INTEGER NOT NULL REFERENCES ubicaciones(id_ubicacion),
    id_metodo_pago INTEGER NOT NULL REFERENCES metodos_pago(id_metodo_pago),
    id_estatus INTEGER NOT NULL REFERENCES estatus_cita(id_estatus)
);

-- Insertar datos básicos
INSERT INTO especialidades (nombre) VALUES 
('Pediatría'), ('Dermatología'), ('Cardiología'), ('Medicina General');

INSERT INTO ubicaciones (nombre) VALUES 
('Sede Norte'), ('Sede Centro'), ('Sede Sur');

INSERT INTO metodos_pago (nombre) VALUES 
('Efectivo'), ('Transferencia'), ('Tarjeta Crédito'), ('Tarjeta Débito');

INSERT INTO estatus_cita (nombre) VALUES 
('Confirmada'), ('Cancelada'), ('Pendiente'), ('Reprogramada');