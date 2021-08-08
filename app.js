const SSH2Client = require('ssh2').Client
const express = require('express')
const bodyParser = require('body-parser')

//require our routes
const index = require('./server/index')
const users = require('./server/routes/users')

const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

//set ejs as our templating engine
app.set('view engine', 'ejs')

//set our views
app.use('/', index)
app.use('/users', users)

//open up https to url in browser
app.listen(80)

// IMPORTANT, IS USING THE server-mysql VMWARE VIRTUAL SERVER IN NUC
