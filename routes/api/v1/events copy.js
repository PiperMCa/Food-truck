//require express router
const router = require('express').Router()
const { request, response } = require('express')
//variable for the db connection
const events = require('../../../data/events.json')


//gets all of the event items
 router.get('/', (_, response) =>{
    console.log('Fetching all events')

  const items = events.map(event => {
        const { id, name, time, location, description, date } = event
        return { id, name, time, location, description, date }
    })
  response.send(items)
})

//gets the event item with the specified id
 router.get('/:id', (request, response) =>{
  console.log('Fetching event by id')
   const {id} = request.params

   const found = events.find(event => event.id.toString() === id)
   if (found) return response.send(found)
  response.status(404).send({error: `Could not find event with id ${id}`})
})

//adds a new event item to the list
 router.post('/', (request, response) =>{
  console.log('Adding new event')
    const id = events.length + 1 //new id
    const item = request.body
    const newItem = {id, ...item}
    events.push(newItem)
    response.send(newItem)

})

//return the routes
module.exports = router
