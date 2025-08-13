require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function insertRow(row) {
  // Normalizar email
  const email = row['Correo Paciente'].replace(/_at_/g, '@');
  
  try {
    // Insertar paciente
    await pool.query(
      `INSERT INTO pacientes (nombre, email) 
       VALUES ($1, $2) 
       ON CONFLICT (email) DO NOTHING`,
      [row['Nombre Paciente'], email]
    );

    // Insertar médico y especialidad
    await pool.query(
      `INSERT INTO especialidades (nombre) 
       VALUES ($1) 
       ON CONFLICT (nombre) DO NOTHING`,
      [row.Especialidad]
    );
    
    await pool.query(
      `INSERT INTO medicos (nombre, id_especialidad)
       SELECT $1, id_especialidad 
       FROM especialidades 
       WHERE nombre = $2
       ON CONFLICT (nombre) DO NOTHING`,
      [row.Médico, row.Especialidad]
    );

    // Insertar cita
    await pool.query(
      `INSERT INTO citas (
        id_paciente, id_medico, fecha, hora, motivo, descripcion,
        id_ubicacion, id_metodo_pago, id_estatus
      ) VALUES (
        (SELECT id_paciente FROM pacientes WHERE email = $1),
        (SELECT id_medico FROM medicos WHERE nombre = $2),
        $3, $4, $5, $6,
        (SELECT id_ubicacion FROM ubicaciones WHERE nombre = $7),
        (SELECT id_metodo_pago FROM metodos_pago WHERE nombre = $8),
        (SELECT id_estatus FROM estatus_cita WHERE nombre = $9)
      )`,
      [
        email,
        row.Médico,
        row['Fecha Cita'],
        row['Hora Cita'],
        row.Motivo,
        row.Descripción,
        row.Ubicación,
        row['Método de Pago'],
        row['Estatus Cita']
      ]
    );
  } catch (error) {
    console.error(`Error insertando fila: ${error.message}`);
  }
}

async function main() {
  const results = [];
  
  fs.createReadStream('data_crudclinic.csv')
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', async () => {
      for (const row of results) {
        await insertRow(row);
      }
      console.log('✅ Datos cargados exitosamente!');
      await pool.end();
    });
}

main();