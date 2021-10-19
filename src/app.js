const path = require('path') // Path is a Nodejs core module.
const express = require('express')
const app = express()

console.log(__dirname)
console.log(__filename) // values provided by Nodejs on the console.
// Path to the public directory by means of manipulation. path.join() is 
// a function of the path module.
console.log(path.join(__dirname, '../public'))
// To use this path:
const pathToPublicDirectory = path.join(__dirname, '../public')

// One domain with 3 routes:
// app.com    -- root route --> '' when adressed
// app.com/help --> /help when addressed
// app.com/about  --> /about when addressed
// get() takes in two objects: request and response

app.set('view engine', 'hbs')
// app.set() is a method that provides settings for Express. Here,
// it loads hbs, which is kind of a handlebars plugin for Express.
// It integrates the handlebars module into the Express package.

// To make our web server use the path to the public directory:
app.use(express.static(pathToPublicDirectory))
// This loads the content of the entire public folder into the root page!
// To watch it, you need to go to localhost:3000, or localhost:3000/index.html.

/*
Diese route hier ist jetzt überflüssig, sie wird nicht mehr benutzt, 
weil express.static(pathToPublicDirectory) das Public Directory ins Root-
Verzeichnis liest und die index.html ausgibt.
app.get('', (req, res) => {
    // Putting HTML right into the response:
    res.send('<h1>Weather</h1>')
})
Die hier brauchen wir jetzt auch nicht mehr, weil wir ja jetzt HTML-Seiten
dafür haben.
app.get('/help', (req, res) => {
    // Serving up JSON data (to be consumed by code):
    res.send('<h1>We\'ll help you if you get stuck!</h1>')
    // Express detects that it's an object and automatically stringifies it.
})
app.get('/about', (req, res) => {
    res.send('About us')
})
*/
app.get('', (req, res) => {
    // This makes Express load the index.hbs view:
    res.render('index', {
        title: 'Weather App',
        name: 'Roboto'
    })
    // First arg is the name of the view file (index.hbs), the second 
    // is an object we pass in. The object props can be accessed via 
    // handlebars syntax from the index.hbs file.
})

app.get('/about', (req, res) => {
    // This makes Express load the about.hbs view:
    res.render('about', {
        title: 'About Me',
        name: 'Roboto'
    })
})

app.get('/help', (req, res) => {
    // This makes Express load the about.hbs view:
    res.render('help', {
        title: 'Help Page',
        msg: 'If you need help, you got it!'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        location: 'Bommelheim, Germany',
        forecast: '18 degrees Celsius. Rainy.'
    })
})
// Starting the server on port 3000. 2nd arg is a callback function
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})