//variables
const router = require('express').Router()
const path = require('path')
//tell how to get the the public folder
const root = path.join(__dirname, '..', '..', 'public')

//send the index.html file from the public folder
router.get('/', (_, response) => response.sendFile('index.html', { root }))

//send the event.html file from the public folder
router.get('/event/:eventId', (_, response) => response.sendFile('events.html', { root }))

//send the admin.html file from the public folder
router.get('/admin', (_, response) => response.sendFile('admin.html', { root }))

module.exports = router