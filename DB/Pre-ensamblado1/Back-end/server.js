require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

// Configuración de la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Login simple
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// Endpoint para obtener todas las citas
app.get('/citas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.id_cita, p.nombre AS paciente, m.nombre AS medico, 
             e.nombre AS especialidad, c.fecha, c.hora, ec.nombre AS estatus
      FROM citas c
      JOIN pacientes p ON c.id_paciente = p.id_paciente
      JOIN medicos m ON c.id_medico = m.id_medico
      JOIN especialidades e ON m.id_especialidad = e.id_especialidad
      JOIN estatus_cita ec ON c.id_estatus = ec.id_estatus
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para crear nueva cita
app.post('/citas', async (req, res) => {
  const { paciente, medico, fecha, hora, motivo } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO citas (
        id_paciente, id_medico, fecha, hora, motivo,
        id_ubicacion, id_metodo_pago, id_estatus
      ) VALUES ($1, $2, $3, $4, $5, 1, 1, 3) 
      RETURNING *`,
      [paciente, medico, fecha, hora, motivo]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Consultas avanzadas
app.get('/citas/filtrar', async (req, res) => {
  const { medico, fecha_inicio, fecha_fin } = req.query;
  const result = await pool.query(
    `SELECT * FROM citas 
     WHERE id_medico = $1 
     AND fecha BETWEEN $2 AND $3`,
    [medico, fecha_inicio, fecha_fin]
  );
  res.json(result.rows);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});