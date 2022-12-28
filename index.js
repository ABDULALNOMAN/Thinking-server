const express = require('express');
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
const { query } = require('express');
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

// user: userthinking
// pass: FbjKNr4LfLLqYGn6


const uri =`mongodb+srv://userthinking:FbjKNr4LfLLqYGn6@cluster0.jhoqsnq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async() => {
    try {
        const publicCollection = client.db('Thinkingdata').collection('dataSet')
        app.post('/adding', async (req, res) => {
            const query = req.body;
            const result = await publicCollection.insertOne(query)
            res.send(result)
        })
        app.get('/media', async (req, res) => {
            const query = {}
            const result = await publicCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/showing', async(req, res) => {
            const query = {};
            const result = await publicCollection.find(query).limit(3).toArray()
            res.send(result)
        })
        app.get('/another/:id', async(req,res)=>{
            const id = req.params.id
            const query = {_id:ObjectId(id)}
            const result = await publicCollection.findOne(query)
            res.send(result)
        })
    }
    finally {
        
    }
}
run().catch((err)=>console.log(err))

app.get('/', (req, res) => {
    res.send('hello world')
})
app.listen(port,()=>{
    console.log('thinking process')
})