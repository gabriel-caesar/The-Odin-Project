const pool = require('./pool');

async function getAllUsers() {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
}

async function insertNewUser(firstName, lastName, email, age, bio) {
  await pool.query(
    `
      INSERT INTO users (firstName, lastName, email, age, bio) 
      VALUES 
        ($1, $2, $3, $4, $5);
    `,
    [firstName, lastName, email, age, bio]
  );
}

async function getUser(id) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE users.id = ($1);`,
    [id]
  );
  return rows;
}

async function updateUser(firstName, lastName, email, age, bio, id) {
  await pool.query(
    `
      UPDATE users 
      SET 
        firstName = ($1),
        lastName = ($2),
        email = ($3),
        age = ($4),
        bio = ($5)
      WHERE users.id = ($6);
    `,
    [firstName, lastName, email, age, bio, id]
  );
}

async function searchUser(query, searchBy) {
  const { rows } = await pool.query(
    `
      SELECT * FROM users WHERE ${searchBy} ILIKE ($1);
    `,
    [`%${query}%`]
  );
  return rows;
}

async function deleteUser(id) {
  await pool.query(`DELETE FROM users WHERE id = ($1)`, [id]);
}

async function deleteAllUsers() {
  await pool.query('DELETE FROM users;');
}

module.exports = {
  getAllUsers,
  insertNewUser,
  updateUser,
  getUser,
  searchUser,
  deleteUser,
  deleteAllUsers
};

