console.log("Client-side Javascript file loaded!")
// This message is not shown on the browser console, but on the console. 
// of the developer tools. In Chrome: Settings > More Tools > Developer Tools.

// Hint: 'fetch' is a browser-provided API function that exists in most 
// modern browsers. However, it is not part of Node.js, so you 
// cannot use it in a backend-Javascript file. It only works 
// in client-side Javascript files.

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
// This kicks off an asynchronous I/O operation.
// This means we don't have access to the data right away.
// Note the different syntax: the callback function is an argument of
// the then() method.

// Challenge lesson 57:
// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })
const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
// if we target by element name, document.querySelector picks the 
// first element of that type on the page. This won't work with 
// the message paragraphs. We therefore have to target by ID, 
// which requires the #-sign in front of the ID.
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const locationButton = document.querySelector('#get-location')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log('testing!')
    // Clicking the Search button makes testing! pop up for just 
    // a fraction of a second. That's because the browser reloads
    // the entire page after the event, so the message is cleared.
    // This made sense in the past, but not nowadays.
    // Workaround: provide named argment 'event' or 'e', 
    // then set e.preventDefault() (as mentioned in React course).
    const location = searchTerm.value
    // searchTerm.value extracts the value of the input element.
    console.log(location)
    messageOne.textContent='Loading ...'
    // Just in case there is some content from a previous run:
    messageTwo.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
        // Removed the domain from the fetch call, as it is going 
        // to be different if the app is either run on localhost or
        // on Heroku. The principle is the same as in the Handlebars 
        // partial header.hbs.
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent=data.error
        } else {
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
  })
})
locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Your browser does not support geolocation!')
    }
    locationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
      
        const pos = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        locationButton.removeAttribute('disabled')
        console.log('Location fetched.')
        console.log(position)

        fetch(`/location?coords=${pos.latitude},${pos.longitude}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error
            } else {
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }
        })
      })
    })
    
})