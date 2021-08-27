const database = require('../../database/model/connect-remote-mysql');

const indexContent = (req, res) => {
  database.then((connection, err) => {
    connection.connect((err) => {
      if (err) {
        res.render('index', {
          title: 'app0x',
          status: 'off',
        });
        connection.end();
      } else {
        res.render('index', {
          title: 'app0x',
          status: 'on',
        });
      }
    });
  });
};

module.exports = indexContent;
