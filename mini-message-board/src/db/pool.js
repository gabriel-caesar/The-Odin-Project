const { Pool } = require('pg');
require('dotenv').config();

module.exports = new Pool({
  host: 'gondola.proxy.rlwy.net',
  user: 'postgres',
  database: 'railway',
  password: process.env.DB_PASS,
  port: '16192',
  ssl: { rejectUnauthorized: false }
})