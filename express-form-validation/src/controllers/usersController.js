// controllers/usersController.js
const { body, validationResult, matchedData } = require('express-validator');
const {
  getAllUsers,
  insertNewUser,
  updateUser,
  getUser,
  searchUser,
  deleteUser,
  deleteAllUsers,
} = require('../db/queries');

const alphaErr = 'must only contain letters';
const lengthErr = 'must not be between 1 and 10 characters.';

const validateUser = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body('email').trim().isEmail().withMessage('Email needs to be an email'),
  body('age')
    .optional({ values: 'falsy' })
    .trim()
    .isNumeric()
    .withMessage('Age needs to be a number')
    .custom((x) => x >= 18 && x <= 120)
    .withMessage('Min. age is 18 and max. is 120'),
  body('bio')
    .trim()
    .isLength({ max: 200 })
    .withMessage('Bio is 200 characters max.'),
];

// validation is done by returning an array with the first
// element being the validation constraints array and the
// middleware function as the second argument
exports.usersCreatePost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('createUser', {
        title: 'Create user',
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, age, bio } = matchedData(req);
    await insertNewUser(firstName, lastName, email, age, bio);
    res.redirect('/');
  },
];

exports.usersListGet = async (req, res) => {
  res.render('index', {
    title: 'User list',
    users: await getAllUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render('createUser', {
    title: 'Create user',
  });
};

exports.usersUpdateGet = async (req, res) => {
  const { id } = req.params;
  const user = await getUser(Number(id));
  if (!user) throw new Error(`Coundn't find user with id ${id}.`);
  res.render('updateUser', { title: 'Update user', user: user[0] });
};

// validation is done by returning an array with the first
// element being the validation constraints array and the
// middleware function as the second argument
exports.usersUpdatePost = [
  validateUser,
  async (req, res) => {
    const { id } = req.params;
    const user = await getUser(id);
    if (!user) throw new Error(`Coundn't find user with id ${id}.`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('updateUser', {
        title: 'Update user',
        user: user[0],
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = matchedData(req);
    await updateUser(firstName, lastName, email, age, bio, id);
    res.redirect('/');
  },
];

exports.usersDeletePost = async (req, res) => {
  const { id } = req.params;
  await deleteUser(id);
  res.redirect('/');
};

exports.usersSearchGet = async (req, res) => {
  let searchedArr = [];
  const { query, searchBy } = req.query;

  if (query && searchBy) searchedArr = await searchUser(query, searchBy);

  res.render('search', {
    title: 'User search',
    users: searchedArr,
    search: query ? query : '',
    searchBy: searchBy,
  });
};

exports.usersDeleteAllPost = async (req, res) => {
  await deleteAllUsers();
  res.redirect('/');
}
