// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator');

const database = require('../../database/model/remote-mysql-connect');

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
