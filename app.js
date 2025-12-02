//variables
const express = require('express');//require expressjs module (pull it in)
const app = express();//create an express application
const port = 3000;//define port number it runs on

//ensure express can send json
app.use(express.json())
//let express use our static (public) folder (the folder with our html docs)
app.use(express.static('public'))

//hook up our api routes for the events and the menu
app.use('/api/v1/events', require('./api/v1/events'))
app.use('/api/v1/menu', require('./api/v1/menu'))

//routes for our html pages
app.use('/', require('./routes/pages/events'))
app.use('/', require('./routes/pages/menu'))

//things printed to the console when the server is running
app.listen(port, () => console.log(`Listening on port: ${port}`))
app.listen(port, ()=>console.log(`http://localhost:${port}`))