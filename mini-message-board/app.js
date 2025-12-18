const express = require('express');
const path = require('node:path');
const { indexRouter } = require('./routes/index-router');
const newRouter = require('./routes/new-router');

const app = express();
app.use(express.urlencoded({ extended: true })); // makes getting form data possbile through req.body

app.use('/', indexRouter);
app.use('/new', newRouter);

// sets EJS and assets up
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

// sets the server up
const PORT = 3000;
app.listen(PORT, (error) => {
  console.log('Server running → localhost:3000/');
});
