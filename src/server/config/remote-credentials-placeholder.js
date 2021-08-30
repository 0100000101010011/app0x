const config = {
  server: {
    // configs for connecting to on-prem vm server
    host: '192.168.1.xxx',
    port: 22,
    user: 'root',
    password: '**********',
  },
  // configs for connecting to mysql inside the vm server, port can be any number
  mysql: {
    host: '127.0.0.1',
    port: 3306,
  },
  // configs to connect to the the database created within mysql
  database: {
    user: 'root',
    password: '**********',
    name: 'database_name',
  },
};

module.exports = config;
