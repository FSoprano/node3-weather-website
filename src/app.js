const path = require('path') // Path is a Nodejs core module.
const express = require('express')
const hbs = require('hbs') // Needed for the use of handlebars partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const forecastLoc = require('./utils/forecastLoc')
const app = express()
const port = process.env.PORT || 3000
// The port change is necessary because the app uses a different 
// port when deployed on Heroku. What Heroku provides will be stored
// in process.env.PORT. Alternatively, port 3000 will be used if 
// the first option does not work (localhost run).

console.log(__dirname)
console.log(__filename) // values provided by Nodejs on the console.
// Path to the public directory by means of manipulation. path.join() is 
// a function of the path module.
console.log(path.join(__dirname, '../public'))
// To use this path:
const pathToPublicDirectory = path.join(__dirname, '../public')
// Path for Handlebars file location (for Express):
const viewsPath = path.join(__dirname, '../templates/views')
// We only need this if the files are in a folder other than 'views'.
const partialsPath = path.join(__dirname, '../templates/partials')

// One domain with 3 routes:
// app.com    -- root route --> '' when adressed
// app.com/help --> /help when addressed
// app.com/about  --> /about when addressed
// get() takes in two objects: request and response

// Set up handlebars engine and views location:
app.set('view engine', 'hbs')
// app.set() is a method that provides settings for Express. Here,
// it loads hbs, which is kind of a handlebars plugin for Express.
// It integrates the handlebars module into the Express package.
app.set('views', viewsPath)
// Tells express not to look in the views dir for handlebars files, but 
// in the ../templates/views dir, according to the definition of viewsPath
hbs.registerPartials(partialsPath)
// Static directory to serve:
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
        msg: 'If you need help, you got it!',
        name: 'Roboto'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        // return: see error explanation below.
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            // return stops the function execution
            return res.send({
                error // shorthand for error: error
            })
        }
        
        forecast( latitude, longitude , (error, forecastData ) => {
            if (error) {
                return res.send({
                    error // shorthand for error: error
                })
            }
            res.send({
                location,   // Shorthand again
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/location', (req, res) => {
    
    const coords = req.query.coords.split(',')
    const latitude = coords[0]
    const longitude = coords[1]
        
    forecastLoc( latitude, longitude , (error, { location, forecastData }) => {
        if (error) {
            return res.send({
                error // shorthand for error: error
            })
        }
        res.send({location, 
            forecast: forecastData})
        })
})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        // return: see error explanation below.
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    // Error "Cannot set headers after they are sent to the client"
    // means: A response was sent twice, although only one time is 
    // allowed. To prevent this: use return inside the if statement, 
    // that the code execution stops after the condition is met.

    // URL search and other information is part of the request object.
    // .query is part of the request object.
    // The command will print the query string ('games') from the Browser URL in the 
    // address field to the console:
    console.log(req.query.search);
    res.send({
        products: [],
    })
})
// /help/* is the route for unmatched help routes. (404 message).
app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Roboto',
        nopage: 'Help article not found!'
    })
})
// * is the route for everything that did not have a match so far in the 
// other routes (404 message). It's also the reason why it needs to come last.
app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Roboto',
        nopage: 'Page not found!'
    })
})
// Starting the server on port 3000. 2nd arg is a callback function
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})