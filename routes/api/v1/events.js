//require express router
const router = require('express').Router()
//variable for the db connection
const {getCollection, ObjectId} = require('../../../../dbconnect')


//gets all of the event items
 router.get('/api/v1/events', async (_, response) =>{
    const eventItems = await getCollection('FoodTruckAPI','Events')
  const items = await eventItems.find({}).toArray()
  response.send(items)

})

//gets the event item with the specified id
 router.get('/api/v1/events/:id', async (request, response) =>{
   const {id} = request.params

   try{
    const eventItems=await getCollection('FoodTruckAPI','Events')
    const found = await eventItems.findOne({_id: new ObjectId(id)})

    if (found) return response.send(found)
    response.status(404).send({error: 'Could not find event with id '+id})
   }
   catch{
   response.status(404).send({error: 'Could not fetch event'})
   }
})

//adds a new event item to the list
 router.post('/api/v1/events', async (request, response) =>{
     try{
    const eventItems=await getCollection('FoodTruckAPI','Events')
    const id = eventItems.lentgh + 1 //new id
    const item = await eventItems.insertOne(request.body)
    const newItem = {id, ...item}
    response.send(newItem)
   }
   catch{
    response.status(500).send({error: 'Could not add event item'})
   }
})

//return the routes
module.exports = router
