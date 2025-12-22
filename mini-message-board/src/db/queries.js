const pool = require('./pool');

async function createNewMessage(user, content, date) {
  await pool.query(`
    INSERT INTO messages (username, content, added)
    VALUES
      ($1, $2, $3);
  `, [user, content, date])
};

async function getAllMessages() {
  const { rows } = await pool.query(`
    SELECT * FROM messages;  
  `);

  return rows;
};

async function getUser(id) {
  const { rows } = await pool.query(`
    SELECT * FROM messages WHERE id = ($1);
  `, [id]);
  return rows;
};

async function deleteUser(id) {
  await pool.query(`
    DELETE FROM messages WHERE id = ($1);
  `, [id]);
}

module.exports = { createNewMessage, getAllMessages, getUser, deleteUser }