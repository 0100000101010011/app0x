# DatabAse

A SQL database manager with a snappy UI.

NOT WORKING, THE SERVER KEEPS OVERHEATING, HAVE TO FIX THIS FIRST OR MOVE TO PC TO PROCEED

## Usage

For the app to run smoothly, you'll need to connect to the database successfully. You can use MySQL Workbench to help with connecting to the database.

Turn on your network hardware if not already turned on:

* QNAP storage
* NUC server

Then turn on your virtual servers, in NUC vmware fire up:

* server-mysql
  * Username:
  * Password: 
  * IP: 
* server-nodejs-windows-10
  * Username: 
  * Password: 
  * IP: 

You can fire up the app using

```
npm run build
```

Navigate to 127.0.0.1 or localhost to see the app

It's a different ip for the remote access and a few additional steps to set this up

## Connect Database

For MySQL on a remote VM on the same network

* All files involved
  * /db.js
  * /routes/users.js

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## About
2020 [seggido.com](seggido.com), [0100000101010011](https://github.com/0100000101010011)