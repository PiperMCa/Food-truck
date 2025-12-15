//require express router
const router = require('express').Router()
//variable for the db connection
const {getCollection,ObjectId} = require('../../../dbconnect')


//gets all of the menu items
 router.get('/', async (_, response) =>{
   
  const menuItems = await getCollection('FoodTruckAPI','MenuItems')
  const items = await menuItems.find({}).toArray()
  response.send(items)

})

//gets the menu item with the specified id
 router.get('/menu/:id', async (request, response) =>{
   const {id} = request.params
    const collection =await getCollection('FoodTruckAPI','MenuItems')
    const found = await collection.findOne({id:parseInt(id)})
    if (found) return response.send(found)
    response.status(404).send({error: 'Could not find menu item with id '+{id}})
   
   

})

//adds a new menu item to the list
 router.post('/menu/add', async (request, response) =>{
    const {id, type, item, description, cost} = request.body
    const collection= await getCollection('FoodTruckAPI','MenuItems')
    const results = await collection.insertOne({id, type, item, description, cost})
    response.send(results)
 
   
})

//return the routes
module.exports = router

