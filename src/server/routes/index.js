const express = require('express');
const app = express();
const path = require('path');

const database = require('../database/model/remote-mysql-connect');

// change the path to views from root directory to public/views
// res https://stackoverflow.com/questions/50893222/how-do-i-require-something-in-root-project-directory-from-inside-node-package-li
app.set('views', path.join(__dirname, '../../../public', 'views'));

// use any static files in /views/assets folder, like css
app.use('/assets', express.static('public/assets'));

// bring in the index-content.js function/module
const indexContent = require('./templates/index-content');
// display it on the index page
app.get('/', indexContent);

// toggle server status
// bring in the db-status.js function/module
const dbStatus = require('./templates/db-status');
app.post('/database', dbStatus);

module.exports = app;
