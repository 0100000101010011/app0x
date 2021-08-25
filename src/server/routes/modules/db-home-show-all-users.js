const database = require('../../database/model/connect-remote-mysql');

const dbHomeShowAllUsers = (req, res, next) => {
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
};

module.exports = dbHomeShowAllUsers;
