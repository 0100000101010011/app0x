const express = require('express');
const app = express();
// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator');

const urlencodedParser = express.urlencoded({ extended: false });

// utilities for dealing with file paths
const path = require('path');

// ROUTES

// change the path to views from root directory to public/views
// res https://stackoverflow.com/questions/50893222/how-do-i-require-something-in-root-project-directory-from-inside-node-package-li
app.set('views', path.join(__dirname, '../../../public', 'views'));

// CRUD (CREATE, READ, UPDATE, DELETE)

// CREATE

// call module
const renderAddUser = require('./templates/users/render-add-user');
// use module to render data on the add rout/page
app.get('/add', renderAddUser);

// call module
const queryAddUser = require('./templates/users/query-add-user');
// use module to post user data to the database route
app.post(
  '/add',
  urlencodedParser,
  [
    check('name', 'please provide a valid name')
      .not()
      .isEmpty()
      .isLength({ min: 7 })
      .trim()
      .escape(),
    check('age', 'optional').isLength({ max: 2 }).optional(),
    check('email', 'please provide a valid email address')
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail()
      .trim()
      .escape(),
  ],
  queryAddUser
);

// READ

// call module
const queryUserList = require('./templates/users/query-user-list');
// use module to render data on the index/homepage
app.get('/', queryUserList);

// UPDATE

// call module
const queryEditUser = require('./templates/users/query-edit-user');
// use module to query the database for user detals by user id
app.get('/edit/(:id)', queryEditUser);

// call module
const queryEditUserUpdate = require('./templates/users/query-edit-user-update');
// use module to post updated user data to the database
app.post(
  '/edit/(:id)',
  urlencodedParser,
  [
    check('name').not().isEmpty().isLength({ min: 7 }).trim().escape(),
    check('age', 'optional').isLength({ max: 2 }).optional(),
    check('email').not().isEmpty().isEmail().normalizeEmail().trim(),
  ],
  queryEditUserUpdate
);

// DELETE

// call module
const dbDeleteId = require('./templates/users/query-delete-user');
// use module to query delete user by id to database
app.post('/delete/(:id)', dbDeleteId);

module.exports = app;
