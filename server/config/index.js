const config = {
  server: {
    /*this host address is access to the is for the server-mysql vm in NUC VMWare */
    host: '192.168.1.253',
    port: 22,
    user: 'root',
    password: 'P1ucm4d0c!',
  },
  mysql: {
    host: '127.0.0.1',
    port: 3306,
  },
  database: {
    user: 'root',
    password: 'P1ucm4d0c!',
    name: 'user_test',
  },
}

module.exports = config
