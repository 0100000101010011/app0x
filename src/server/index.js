const express = require('express');
const app = express();
const path = require('path');

// change the path to views from root directory to public/views
// res https://stackoverflow.com/questions/50893222/how-do-i-require-something-in-root-project-directory-from-inside-node-package-li
app.set('views', path.join(__dirname, '../../public', 'views'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Database Manager',
  });
});

// use any static files in /views/assets folder, like css
app.use('/views', express.static('public/views'));

// create a new route /assets, and route any requests for files found in node_modules to /assets
// so the file path to any file like a js or css file anywhere in node_modules directory will look like
// /assets/scripts.js
// res https://expressjs.com/en/starter/static-files.html
app.use(
  '/aos',
  express.static(path.join(__dirname, '../../node_modules/aos/dist'))
);

module.exports = app;
