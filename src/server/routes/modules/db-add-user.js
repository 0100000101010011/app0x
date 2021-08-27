// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator');

const database = require('../../database/model/connect-remote-mysql');

const dbAddUser = (req, res) => {
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
      status: 'on',
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
              status: 'off',
            });
          } else {
            res.render('user/add', {
              title: 'Success! User Added',
              name: user.name,
              age: user.age,
              email: user.email,
              status: 'on',
            });
          }
        }
      );
    });
  }
};

module.exports = dbAddUser;
