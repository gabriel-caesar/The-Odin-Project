const { Pool } = require('pg');

module.exports = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'auth_db',
  password: '18032003',
  port: '5432',
});