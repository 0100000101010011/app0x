const express = require('express');
const app = express();
const database = require('../../../src/server/database/remote-mysql');
// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// utilities for dealing with file paths
const path = require('path');

// change the path to views from root directory to public/views
// res https://stackoverflow.com/questions/50893222/how-do-i-require-something-in-root-project-directory-from-inside-node-package-li
app.set('views', path.join(__dirname, '../../../public', 'views'));

app.get('/', function (req, res, next) {
  database.then((connection, err) => {
    connection.query('SELECT * FROM users ORDER by id DESC', (err, result) => {
      // if any error while executing above query, throw error
      if (err) {
        res.render('user/list', {
          title: 'User List',
          data: '',
        });
      } else {
        res.render('user/list', {
          title: 'User List',
          data: result,
        });
      }
    });
  });
});

app.get('/add', (req, res, next) => {
  res.render('user/add', {
    title: 'Add New User',
    name: '',
    age: '',
    email: '',
  });
});

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
  (req, res) => {
    const errors = validationResult(req);

    let user = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    };

    // this is kind of an unideal way to do this kind of check to make sure all fields are filled in, but it'll do the job for now
    if (!errors.isEmpty()) {
      res.render('user/add', {
        title: 'Oops! May be a typo...',
        name: user.name,
        age: user.age,
        email: user.email,
      });

      // need error messages to show on the page here
      // right now it just hangs in loading and waits for you to put in right information or crashes
      // because you can't use browser or DOM javascript code, everything has to go through express to render a view

      // uncomment below for it to just take/route you to a blank page with an error message
      // return res.status(422).json({ errors: errors.array() });
    } else {
      database.then((connection) => {
        connection.query(
          'INSERT INTO `user_test`.`users` SET ? ',
          user,
          (err, result) => {
            // if any error while executing above query, throw error
            if (err) {
              res.render('user/add', {
                title: "Oops! can't connect to database",
                name: '',
                age: '',
                email: '',
              });
            } else {
              res.render('user/add', {
                title: 'Success! User Added',
                name: user.name,
                age: user.age,
                email: user.email,
              });
            }
          }
        );
      });
    }
  }
);

app.post('/delete/(:id)', function (req, res, next) {
  let user = {
    id: req.params.id,
  };

  database.then((connection) => {
    connection.query(
      'DELETE FROM `users` WHERE `id` = ' + req.params.id,
      user,
      (err, rows, fields) => {
        return err ? res.redirect('/users') : res.redirect('/users');
      }
    );
  });
});

app.get('/edit/(:id)', (req, res, next) => {
  database.then((connection, err) => {
    connection.query(
      'SELECT * FROM users WHERE id = ' + req.params.id,
      (err, rows, fields) => {
        if (err) throw err;

        if (rows.length <= 0) {
          req.flash('error', 'User not found');
          res.redirect('/users');
        } else {
          res.render('user/edit', {
            title: 'Edit User',
            id: rows[0].id,
            name: rows[0].name,
            age: rows[0].age,
            email: rows[0].email,
          });
        }
      }
    );
  });
});

app.post(
  '/edit/(:id)',
  urlencodedParser,
  [
    check('name').not().isEmpty().isLength({ min: 7 }).trim().escape(),
    check('age', 'optional').isLength({ max: 2 }).optional(),
    check('email').not().isEmpty().isEmail().normalizeEmail().trim(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    let user = {
      id: req.params.id,
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    };

    if (!errors.isEmpty()) {
      res.render('user/edit', {
        title: 'Oops! May be a typo...',
        id: req.params.id,
        name: user.name,
        age: user.age,
        email: user.email,
      });
    } else {
      database.then((connection) => {
        connection.query(
          'UPDATE `users` SET ? WHERE `id` = ' + req.params.id,
          user,
          (err, result, fields) => {
            // if any error while executing above query, throw error
            if (err) {
              console.log(err);
            } else {
              res.render('user/edit', {
                title: 'Success! User updated',
                id: req.params.id,
                name: user.name,
                age: user.age,
                email: user.email,
              });
            }
          }
        );
      });
    }
  }
);

module.exports = app;
