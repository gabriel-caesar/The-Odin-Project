const { Client } = require('pg');
require('dotenv').config();

const SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstName VARCHAR ( 255 ),
    lastName VARCHAR ( 255 ),
    email VARCHAR ( 255 ),
    age INT,
    bio TEXT
  );

  INSERT INTO users (firstName, lastName, email, age, bio)
  VALUES
    ('Odin', 'Ymirson', 'odin@email.com', 75, 'I created the norse world'),
    ('Thor', 'Odinson', 'thor@email.com', 33, 'I am the god of thunder, I like to drink beer and kill giants'),
    ('Loki', 'Odinson', 'loki@email.com', 28, 'I am a tricky little fella that will cause Ragnarok (and I like animals)');
`;

// opening a single connection with the database and seeding it
async function main() {
  console.log('Seeding Database...');
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Done seeding');
};

main();
