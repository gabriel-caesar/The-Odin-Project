const pool = require('../db/pool');
const bcrypt = require('bcryptjs');

exports.signUpGet = async (req, res) => {
  res.render('sign-up-form', { title: 'Sign up' });
}

exports.signUpPost = async (req, res, next) => {
  const pass = await bcrypt.hash(req.body.password, 10);
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      pass,
    ]);
    res.redirect("/");
  } catch(err) {
    return next(err);
  }
}