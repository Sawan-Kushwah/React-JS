const express = require('express')
// const dotenv = require('dotenv')
const { MongoClient } = require('mongodb'); 
const bodyparser = require('body-parser')
const cors = require('cors')

// dotenv.config()


// Connecting to the MongoDB Client
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
client.connect();

// App & Database
const dbName = 'passwordManager' 
const app = express()
const port = 3000 

// Middleware
app.use(bodyparser.json())
app.use(cors())


// Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Save a password
app.post('/', async (req, res) => { 
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const insertData = await collection.insertOne(password);
    res.send({success: true, result: insertData})
})

// Delete a password by id
app.delete('/', async (req, res) => { 
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const deleteData = await collection.deleteOne(password);
    res.send({success: true, result: deleteData})
})


app.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
})