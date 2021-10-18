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