console.log("Client-side Javascript file loaded!")
// This message is not shown on the browser console, but on the console. 
// of the developer tools. In Chrome: Settings > More Tools > Developer Tools.

// Hint: 'fetch' is a browser-provided API function that exists in most 
// modern browsers. However, it is not part of Node.js, so you 
// cannot use it in a backend-Javascript file. It only works 
// in client-side Javascript files.

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
// This kicks off an asynchronous I/O operation.
// This means we don't have access to the data right away.
// Note the different syntax: the callback function is an argument of
// the then() method.

// Challenge lesson 57:
fetch('http://localhost:3000/weather?address=Boston').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})