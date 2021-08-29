const database = require('../../database/model/remote-mysql-connect');

const dbEditId = (req, res, next) => {
  database.then((connection, err) => {
    // query whether it's 1 (on) or not (0)
    connection.query('SELECT * FROM status', (err, rows) => {
      // if it is 1
      if (rows[0].status == 1) {
        connection.query(
          'SELECT * FROM users WHERE id = ' + req.params.id,
          (err, rows) => {
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
      } else if (rows[0].status == 0) {
        // AND THEN HERE YOU'LL RENDER A BLANK ADD USER FORM, OR ONE THEY CAN'T ADD ANYTHING TO, DISABLED FIELDS AND BUTTONS
        res.redirect('/');
      }
    });
  });
};

module.exports = dbEditId;
