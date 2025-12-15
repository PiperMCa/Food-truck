//require express router
const router = require('express').Router()
//variable for the db connection
const {getCollection, ObjectId} = require('../../../dbconnect')


//gets all of the event items
 router.get('/', async (_, response) =>{
    console.log('Fetching all events ')
    const eventItems = await getCollection('FoodTruckAPI','Events')
  const items = await eventItems.find({}).toArray()
  response.send(items)

})

//gets the event item with the specified id
 router.get('/:id', async (request, response) =>{
  console.log('Fetching event by id')
   const {id} = request.params
    const eventItems=await getCollection('FoodTruckAPI','Events')
    const found = await eventItems.findOne( { id: parseInt(id)} )
    if (found) return response.send(found)
    response.status(404).send({error: 'Could not find event with id '+id})

})

//adds a new event item to the list
 router.post('/', async (request, response) =>{
    console.log('Adding new event')
    const { id, name, time, location, description, date } = request.body
    const eventItems=await getCollection('FoodTruckAPI','Events')
    const item = await eventItems.insertOne(request.body)
    const result = await eventItems.insertOne({ id, name, time, location, description, date })
    response.send(result)
    if (result.acknowledged) {
      console.log('Event item added')
    }
    else {
      response.status(500).send({error: 'Could not add event item'})
    }
})

//return the routes
module.exports = router
