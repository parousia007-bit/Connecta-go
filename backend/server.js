const fastify = require('fastify')({ logger: false });
const { Pool } = require('pg');

// Lógica de conexión: Usa la variable de entorno o la URL que proporcionaste
const connectionString = process.env.DATABASE_URL || 'postgresql://connectago_user:qlFD3ajvnskBybDjZD5FraqDw59tWVXl@dpg-d58jrte3jp1c73biaisg-a.oregon-postgres.render.com/connectago';

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false } // Obligatorio para conectar con Render Postgres
});

fastify.register(require('@fastify/cors'), { origin: '*' });

// --- RUTAS DE LA PLATAFORMA ---

// Registro de Asistente
fastify.post('/api/generate', async (request) => {
  const { attendeeName, groupName } = request.body;
  const label = `CNCT-${Math.random().toString(36).toUpperCase().substring(2,8)}`;
  try {
    const res = await pool.query(
      'INSERT INTO wristbands (uid, label, attendee_name, status) VALUES ($1, $2, $3, $4) RETURNING *',
      ['ID'+Date.now(), label, attendeeName, groupName || 'General']
    );
    return { success: true, data: res.rows[0] };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// Registro de Esforzador (FASE 1)
fastify.post('/api/register', async (request) => {
  const { fullName, localSociety, presbytery, synodalUnion } = request.body;
  const uid = 'ID' + Date.now();
  // Generar ID de registro aleatorio para el gafete
  const registrationId = `REG-${Math.floor(1000 + Math.random() * 9000)}`;
  const label = `CNCT-${Math.random().toString(36).toUpperCase().substring(2,8)}`;

  try {
    // Insertar en la tabla wristbands con los nuevos campos
    // Se asume que la tabla ha sido actualizada para tener society, presbytery, union_synodal
    // Si no, estos campos se podrían guardar en un campo JSON o en status concatenados.
    // Dado que yo ya actualicé la tabla en el paso anterior, puedo usar las columnas directamente.

    const res = await pool.query(
      `INSERT INTO wristbands (uid, label, attendee_name, society, presbytery, union_synodal, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [uid, label, fullName, localSociety, presbytery, synodalUnion, registrationId]
    );
    return { success: true, data: res.rows[0] };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
});

// Lista de Asistentes
fastify.get('/api/attendees', async () => {
  try {
    const res = await pool.query('SELECT * FROM wristbands ORDER BY attendee_name ASC');
    return res.rows;
  } catch (err) {
    return [];
  }
});

// Check-in de Seguridad (Modo Autobús)
fastify.post('/api/checkin', async (request) => {
  const { label } = request.body;
  try {
    await pool.query('UPDATE wristbands SET status = status || "_checked" WHERE label = $1', [label]);
    return { success: true };
  } catch (err) {
    return { success: false };
  }
});

// --- LANZAMIENTO ---
const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await fastify.listen({ port: port, host: '0.0.0.0' });
    console.log(`🚀 Connecta Go Cloud: Conectado a Postgres y operando en puerto ${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
