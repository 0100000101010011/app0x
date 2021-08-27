// simple ssh connection check

const Client = require('ssh2').Client;
const mysql = require('mysql2');
const ssh = new Client();

// import database config file with connection credentials
const config = require('../../config');

// package the connection to the db variable
const db = new Promise((resolve, reject) => {
  ssh.on('error', function (err) {
    console.log('SSH - Connection Error: ' + err);
  });

  ssh
    .on('ready', () => {
      console.log('SSH - Connection Status: Ready');

      // send connection back in variable depending on success or not
      connection.connect((err) => {
        // now we use connection() whenever we want to query the database
        return !err ? resolve(connection) : reject(err);
      });
    })
    .connect({
      host: config.server.host,
      port: config.server.port,
      username: config.server.user,
      password: config.server.password,
      readyTimeout: 500,
    });
});

module.exports = db;
