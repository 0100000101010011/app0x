const database = require('../../database/model/connect-remote-mysql');

const dbAddUserBlankInputs = (req, res, next) => {
  database.then((connection, err) => {
    connection.connect((err) => {
      if (err) {
        res.render('user/add', {
          title: 'Add New User',
          name: '',
          age: '',
          email: '',
          status: 'off',
        });
      } else {
        res.render('user/add', {
          title: 'Add New User',
          name: '',
          age: '',
          email: '',
          status: 'on',
        });
      }
    });
  });
};

module.exports = dbAddUserBlankInputs;
