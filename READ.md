# app0

A SQL database manager with a snappy UI.

## Usage

For the app to work you'll need to connect to the database successfully. 

Make sure your network hardware is turned on if not already turned on:

* QNAP storage
* NUC server
* Virtual machines

Then turn on your virtual servers, in NUC vmware fire up:

* server-mysql
  * Username:
  * Password: 
  * IP: 
* server-centos-8-node-app-2
  * Username: 
  * Password: 
  * IP: 

You can fire up the app by moving into the app's root directory and using command:

```
npm run build
```

In the browser, navigate to your network's external ip e.g. 136.49.54.20:3000 to see the app if accessing the app from OUTSIDE your local home network, e.g. your mobile phone's cellular network.

If you're viewing the app on a local network connection navigate to 127.0.0.1 or localhost to see the app.

It's a different ip for the remote access and a few additional steps to set this up

## Connect Database

For MySQL on a remote VM on the same network

* All files involved
  * Apps\app0\server\config\index.js
  * Apps\app0\server\public\mysql-ssh.js
  * Apps\app0\server\routes\users.js

You can use MySQL Workbench to help with connecting to the database.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## About
2021 [seggido.com](seggido.com), [0100000101010011](https://github.com/0100000101010011)