const SSH2Client = require('ssh2').Client
const express = require('express')
const bodyParser = require('body-parser')
var path = require('path')

//require our routes
const index = require('./src/server/index')
const users = require('./src/server/routes/users')

const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

//set ejs as our templating engine
app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, '../public/views'))

//set our views
app.use('/', index)
app.use('/users', users)

//open up https to url in browser
app.listen(80)

// IMPORTANT, IS USING THE server-mysql VMWARE VIRTUAL SERVER IN NUC
