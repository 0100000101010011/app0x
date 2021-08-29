const express = require('express');
const app = express();

const database = require('../../../database/model/remote-connect-mysql');

const version = require('../../../../../package.json').version;

const renderIndex = (req, res) => {
  // connect to the status table
  database.then((connection, err) => {
    // query whether it's 1 (on) or not (0)
    connection.query('SELECT * FROM status', (err, rows) => {
      // if it is 1
      if (rows[0].status == 1) {
        // render with status property/variable set to 'on' to turn light on green
        res.render('index', { title: 'app0x', status: 'on', version: version });
      } else if (rows[0].status == 0) {
        // render with status property/variable set to 'off' to turn light on red
        res.render('index', {
          title: 'app0x',
          status: 'off',
          version: version,
        });
      }
    });
  });
};

module.exports = renderIndex;
