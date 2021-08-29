const database = require('../../database/model/remote-mysql-connect');

const dbDeleteId = (req, res, next) => {
  let user = {
    id: req.params.id,
  };

  database.then((connection) => {
    connection.query(
      'DELETE FROM `users` WHERE `id` = ' + req.params.id,
      user,
      (err, rows, fields) => {
        return err ? res.redirect('/users') : res.redirect('/users');
      }
    );
  });
};

module.exports = dbDeleteId;
