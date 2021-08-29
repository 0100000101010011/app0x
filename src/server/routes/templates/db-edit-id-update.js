// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator');

const database = require('../../database/model/remote-mysql-connect');

const dbEditIdUpdate = (req, res, next) => {
  const errors = validationResult(req);

  let user = {
    id: req.params.id,
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  };

  if (!errors.isEmpty()) {
    // if fields are empty
    res.render('user/edit', {
      title: 'Oops! May be a typo...',
      id: req.params.id,
      name: user.name,
      age: user.age,
      email: user.email,
      status: 'on',
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
              status: 'on',
            });
          }
        }
      );
    });
  }
};

module.exports = dbEditIdUpdate;
