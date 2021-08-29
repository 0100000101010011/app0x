const database = require('../../database/model/remote-mysql-connect');

const dbStatus = (req, res) => {
  database.then((connection) => {
    connection.query('SELECT * FROM status', (err, rows) => {
      console.log(rows);

      // if it is 1
      if (rows[0].status == 1) {
        connection.query('UPDATE status SET status = 0', (err, result) => {
          // if any error while executing above query, throw error
          console.log('updated');

          res.redirect(req.get('referer'));
        });
      } else if (rows[0].status == 0) {
        connection.query('UPDATE status SET status = 1', (err, result) => {
          // if any error while executing above query, throw error
          console.log('updated');
          res.redirect(req.get('referer'));
        });
      }
    });
  });
};

module.exports = dbStatus;
