const {MongoClient, ObjectId}= require('mongodb')
const {uri}= require('./secrets/mongodb.json')
const client = new MongoClient(uri)//object that is connected up to our db (collection)


//gets our connection from the db
const getCollection = async(dbName,dbcollectionName)=>{
    await client.connect()
    return client.db(dbName).collection(dbcollectionName)
}
module.exports={getCollection, ObjectId}