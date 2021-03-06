const SSH2Client = require('ssh2').Client;
const express = require('express');

const app = express();

// control center or deck, command station ?

// parse any incoming JSON
// ref https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set ejs as our templating engine
app.set('view engine', 'ejs');

// require our routes
// load our homepage
const index = require('./src/server/routes/index');

// load our users and database to access those users
const users = require('./src/server/routes/users');

// set our views
// the homepage
app.use('/', index);

// the users list page
app.use('/users', users);

// redirect all 404s to homepage
app.all('*', (req, res) => {
  res.status(404).redirect('/');
});

// open up http to url in browser (https is port 8080)
app.listen(3000);
