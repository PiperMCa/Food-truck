//require express router
const router = require('express').Router()
//variable for the db connection
const {getCollection, ObjectId} = require('../../../dbconnect')


//gets all of the event items
 router.get('/',async (_, response) =>{
    
  const eventItems = await getCollection('FoodTruckAPI','Events')
  const items =  await eventItems.find({}).toArray()
  response.send(items)

})

//gets the event item with the specified id
 router.get('/events/:id', async (request, response) =>{
    const {id} = request.params
    const collection= await getCollection('FoodTruckAPI','Events')
    const found = await collection.findOne({id:new ObjectId(id)})
    if (found) return response.send(found)
    response.status(404).send({error: 'Could not find event with id '+ {id}})
   
   
   
})

//adds a new event item to the list
 router.post('/events/add', async (request, response) =>{
   
    const {id, name, time, location, description, date} = request.body
    const collection=await getCollection('FoodTruckAPI','Events')//new id
    const results =await collection.insertOne({id, name, time, location, description, date})
    response.send(results)
   
})

//return the routes
module.exports = router
