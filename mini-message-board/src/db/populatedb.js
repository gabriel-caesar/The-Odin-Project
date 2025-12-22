const { Client } = require('pg');
require('dotenv').config();

const SQL = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY ALWAYS AS IDENTITY,
    content TEXT,
    user TEXT,
    added TIMESTAMP WITH TIME ZONE
  );

  INSERT INTO messages (content, user) 
  VALUES
    ('Hello World!', 'Mike'),
    ('Answer the phone, bro!', 'Andrew'),
    ('Can't! Stop bugging me, fool!', 'Ash');
`

async function main() {
  console.log('Seeding Database...');
  const client = new Client({
    connectionString: `postgresql://postgres:${process.env.DB_PASS}@${process.env.DB_HOST}:16192/railway`
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Done seeding');
};

main();