require('dotenv').config();
const express = require('express');
const app = express(); // instantiate the express constructor
const path = require('node:path');
const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');
const indexRouter = require('./routes/indexRouter');

// navbar links
const links = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
];

const users = ["Rose", "Cake", "Biff"];

// setting up EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.get('/', (req, res) => res.render('index', { 
  about: false,
  links: links,
  users: users
}));

app.get('/about', (req, res) => res.render('index', {
  about: true,
  links: links,
  users: users
}))

// registering parent routes
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/', indexRouter);
// needs the four parameters to be recognized as an error middleware function
app.use((err, req, res, next) => { 
  console.error(err);
  res.status(err.statusCode || 500).send(err);
})

// initializing the app server
const PORT = process.env.PORT;
app.listen(PORT, error => {
  if (error) throw error // handle all server errors
  console.log(`Express app - listening on port ${PORT}`)
})