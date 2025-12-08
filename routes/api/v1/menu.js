//require express router
const router = require('express').Router()
//variable for the db connection
const {getCollection, ObjectId} = require('../../../../dbconnect')


//gets all of the menu items
//asyn because it takes time to get the info from the db
 router.get('/api/v1/menu', async (_, response) =>{
   
  const menuItems = await getCollection('FoodTruckAPI','MenuItems')
  const items = await menuItems.find({}).toArray()
  response.send(items)

})

//gets the menu item with the specified id
 router.get('/api/v1/menu/:id', async (request, response) =>{
   const {id} = request.params

   try{
    const menuItems=await getCollection('FoodTruckAPI','MenuItems')
    const found = await menuItems.findOne({_id: new ObjectId(id)})

    if (found) return response.send(found)
    response.status(404).send({error: 'Could not find menu item with id '+id})
   }
   catch{
   response.status(404).send({error: 'Could not fetch menu item'})
   }

})

//adds a new menu item to the list
 router.post('/api/v1/menu', async (request, response) =>{
   try{
    const menuItems=await getCollection('FoodTruckAPI','MenuItems')
    const id = menuItems.lentgh + 1 //new id
    const item = await menuItems.insertOne(request.body)
    const newItem = {id, ...item}
    response.send(newItem)
   }
   catch{
    response.status(500).send({error: 'Could not add menu item'})
   }
})

//return the routes
module.exports = router

