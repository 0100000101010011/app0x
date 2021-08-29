// should really be called credentials.js instead of index.js
const config = {
  server: {
    // configs for connecting to server-mysql database server vm in NUC VMWare
    host: '192.168.1.253',
    port: 22,
    user: 'root',
    password: 'P1ucm4d0c!',
  },
  // configs for connecting to mysql inside server-mysql vm
  mysql: {
    host: '127.0.0.1',
    port: 3306,
  },
  // configs to connect to the database within mysql
  database: {
    user: 'root',
    password: 'P1ucm4d0c!',
    name: 'user_test',
  },
};

module.exports = config;
