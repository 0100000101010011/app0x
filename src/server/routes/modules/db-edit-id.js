const database = require('../../database/model/connect-remote-mysql');

const dbEditId = (req, res, next) => {
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
            status: 'on',
          });
        }
      }
    );
  });
};

module.exports = dbEditId;
