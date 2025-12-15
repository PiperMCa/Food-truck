//require express router
const router = require('express').Router()
//variable for the db connection
const {getCollection, ObjectId} = require('../../../dbconnect')


//gets all of the menu items
//asyn because it takes time to get the info from the db
 router.get('/', async (_, response) =>{
   console.log('Fetching all menu items')
  const menuItems = await getCollection('FoodTruckAPI','MenuItems')
  const items = await menuItems.find({}).toArray()
  response.send(items)

})

//gets the menu item with the specified id
 router.get('/:id', async (request, response) =>{
  console.log('Fetching menu item by id')
   const {id} = request.params

    const menuItems=await getCollection('FoodTruckAPI','MenuItems')
    const found = await menuItems.findOne({ id: parseInt(id)})
    if (found) return response.send(found)
    response.status(404).send({ message: `Could not find menu item with id ${id}`})
   
})

//adds a new menu item to the list
 router.post('/', async (request, response) =>{
  console.log('Adding new menu item')
    const { id, name, description, price } = request.body
    const menuItems=await getCollection('FoodTruckAPI','MenuItems')
    //const id = menuItems.length + 1 //new id
    const item = await menuItems.insertOne(request.body)
    const result = await menuItems.insertOne({ id, name, description, price })
    response.send(result)
    if (result.acknowledged) console.log('Menu item added')
    response.status(500).send({error: 'Could not add menu item'})
    
})

//return the routes
module.exports = router

