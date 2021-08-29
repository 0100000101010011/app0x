const database = require('../../database/model/remote-mysql-connect');

const version = require('../../../../package.json').version;

const dbAddUserBlankInputs = (req, res, next) => {
  // connect to the status table
  database.then((connection, err) => {
    // query whether it's 1 (on) or not (0)
    connection.query('SELECT * FROM status', (err, rows) => {
      // if it is 1
      if (rows[0].status == 1) {
        // render with status property/variable set to 'on' to turn light on green
        res.render('user/add', {
          title: 'Add New User',
          name: '',
          age: '',
          email: '',
          status: 'on',
          version: version,
        });
      } else if (rows[0].status == 0) {
        // AND THEN HERE YOU'LL RENDER A BLANK ADD USER FORM, OR ONE THEY CAN'T ADD ANYTHING TO, DISABLED FIELDS AND BUTTONS
        res.redirect('/');
      }
    });
  });
};

module.exports = dbAddUserBlankInputs;
