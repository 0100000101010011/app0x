const express = require('express')
const app = express()
;(path = require('path')), //Utilities for dealing with file paths
  // change the path to views from root directory to public/views
  // res https://stackoverflow.com/questions/50893222/how-do-i-require-something-in-root-project-directory-from-inside-node-package-li
  app.set('views', path.join(__dirname, '../../public', 'views'))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Database Manager',
  })
})

/*Use any static files in /views/assets folder, like css*/
app.use('/views', express.static('public/views'))

module.exports = app
