const fastify = require('fastify')({ logger: false });
const { Pool } = require('pg');
const pool = new Pool({ database: 'connectago', port: 5432 });

fastify.register(require('@fastify/cors'), { origin: '*' });

// --- RUTAS DE CONECTIVIDAD ---
fastify.post('/api/generate', async (request) => {
  const { attendeeName, groupName } = request.body;
  const label = `CNCT-${Math.random().toString(36).toUpperCase().substring(2,8)}`;
  const res = await pool.query(
    'INSERT INTO wristbands (uid, label, attendee_name, status) VALUES ($1, $2, $3, $4) RETURNING *',
    ['ID'+Date.now(), label, attendeeName, groupName || 'General']
  );
  return { success: true, data: res.rows[0] };
});

fastify.get('/api/attendees', async () => {
  const res = await pool.query('SELECT * FROM wristbands ORDER BY attendee_name ASC');
  return res.rows;
});

fastify.post('/api/checkin', async (request) => {
  const { label } = request.body;
  await pool.query('UPDATE wristbands SET status = status || "_checked" WHERE label = $1', [label]);
  return { success: true };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log("🚀 Connecta Go Central: ONLINE");
  } catch (err) { process.exit(1); }
};
start();
