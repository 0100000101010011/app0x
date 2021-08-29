const database = require('../../database/model/remote-mysql-connect');

const version = require('../../../../package.json').version;

const dbHomeShowAllUsers = (req, res, next) => {
  // connect to the status table
  database.then((connection, err) => {
    // query whether it's 1 (on) or not (0)
    connection.query('SELECT * FROM status', (err, rows) => {
      // if it is 1
      if (rows[0].status == 1) {
        // render with status property/variable set to 'on' to turn light on green
        database.then((connection, err) => {
          connection.query(
            'SELECT * FROM users ORDER by id DESC',
            (err, result) => {
              // if any error while executing above query, throw error
              if (err) {
                res.render('user/list', {
                  title: 'User List',
                  data: '',
                  status: 'off',
                  version: version,
                });
              } else {
                res.render('user/list', {
                  title: 'User List',
                  data: result,
                  status: 'on',
                  version: version,
                });
              }
            }
          );
        });
      } else {
        // render with status property/variable set to 'off' to turn light on red
        res.redirect('/');
        // AND THEN NOW HERE, YOU PUT THE ROUTE TO THE DEMO PAGE
      }
    });
  });
};

module.exports = dbHomeShowAllUsers;
