const express = require('express');
const path = require('node:path');
const usersRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');

const app = express();

app.use(express.urlencoded({ extended: true })); // makes possible getting form data through req.body
app.use('/', usersRouter); // registering main messages router
app.use('/login', loginRouter); // registering login router

// setting up ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));


// initializing the server
const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) throw error
  console.log(`Server running on localhost:${PORT}`);
});
