const express = require('express');
const app = express();
const path = require('path');

const database = require('../database/model/remote-connect-mysql');

// change the path to views from root directory to public/views
// res https://stackoverflow.com/questions/50893222/how-do-i-require-something-in-root-project-directory-from-inside-node-package-li
app.set('views', path.join(__dirname, '../../../public', 'views'));

// use any static files in /public/assets folder, like css
app.use('/assets', express.static('public/assets'));

// call module
const renderIndex = require('./templates/index/render-index');
// use module to render data on the index page
app.get('/', renderIndex);

// toggle server status
// call module
const remoteConnectionStatus = require('./templates/index/query-remote-connection-status');
// use module to post to database
app.post('/database', remoteConnectionStatus);

module.exports = app;
