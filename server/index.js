const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Database Manager',
  })
})

/*Use any static files in /views/assets folder, like css*/
app.use('/views', express.static('views'))

module.exports = app
