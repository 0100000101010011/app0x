const express = require('express');
const app = express();
const path = require('path');

// change the path to views from root directory to public/views
// res https://stackoverflow.com/questions/50893222/how-do-i-require-something-in-root-project-directory-from-inside-node-package-li
app.set('views', path.join(__dirname, '../../../public', 'views'));

// bring in the index-content.js function/module
const indexContent = require('./modules/index-content');
// display it on the index page
app.get('/', indexContent);

// use any static files in /views/assets folder, like css
app.use('/assets', express.static('public/assets'));

module.exports = app;
