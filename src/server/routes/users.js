const express = require('express');
const app = express();
// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator');

// res https://stackoverflow.com/questions/66659450/getting-body-parser-is-deprecated-warning-in-vs-code-and-not-able-to-get-body-tr
// res https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
const urlencodedParser = express.urlencoded({ extended: false });

// utilities for dealing with file paths
const path = require('path');

// ROUTES

// change the path to views from root directory to public/views
// res https://stackoverflow.com/questions/50893222/how-do-i-require-something-in-root-project-directory-from-inside-node-package-li
app.set('views', path.join(__dirname, '../../../public', 'views'));

// CRUD (CREATE, READ, UPDATE, DELETE)

// CREATE

// bring in the db-add-user-blank-inputs.js function/module
const dbAddUserBlankInputs = require('./modules/db-add-user-blank-inputs');
// and display it on the add page
app.get('/add', dbAddUserBlankInputs);

// bring in the db-add-user.js function/module
const dbAddUser = require('./modules/db-add-user');
// add the user to the database using validation checks
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
  dbAddUser
);

// READ

// bring in the db-select-all.js function/module
const dbHomeShowAllUsers = require('./modules/db-home-show-all-users');
// and display it on the homepage
app.get('/', dbHomeShowAllUsers);

// UPDATE

// bring in the db-edit-id.js function/module
const dbEditId = require('./modules/db-edit-id');
// use it
app.get('/edit/(:id)', dbEditId);

// bring in the db-edit-id-update.js function/module
const dbEditIdUpdate = require('./modules/db-edit-id-update');
// use it
app.post(
  '/edit/(:id)',
  urlencodedParser,
  [
    check('name').not().isEmpty().isLength({ min: 7 }).trim().escape(),
    check('age', 'optional').isLength({ max: 2 }).optional(),
    check('email').not().isEmpty().isEmail().normalizeEmail().trim(),
  ],
  dbEditIdUpdate
);

// DELETE

// bring in the db-delete-id.js function/module
const dbDeleteId = require('./modules/db-delete-id');
// use it
app.post('/delete/(:id)', dbDeleteId);

module.exports = app;
