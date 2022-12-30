const express = require('express');
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
const { query } = require('express');
const port = process.env.PORT || 5000
require('dotenv').config()

// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.PASS_KEY}@cluster0.jhoqsnq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async() => {
    try {
        const publicCollection = client.db('Thinkingdata').collection('dataSet')
        const aboutMe = client.db('Thinkingdata').collection('About')
        const commentBox = client.db('Thinkingdata').collection('comments')
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
        app.get('/about', async(req, res) => {
            const query = {};
            const result = await aboutMe.findOne(query)
            res.send(result)
        })
        app.put('/update',async(req,res)=>{
            const query = req.query.id
            const data = req.body
            const id = {_id: ObjectId(query)}
            const option = { upsert:true}
            const updateDoc = {
                $push: {
                    commentBox:data
                }
            }
            const result = await publicCollection.updateOne(id, updateDoc,option) 
            res.send(result)
        })
        app.patch('/modal',async(req,res)=>{
            const id = req.query.id
            const query = {_id: ObjectId(id)}
            const data = req.body
            const option = { upsert: true }
            console.log(data)
            const updateDoc = {
                $set:data
            }
            const result = await aboutMe.updateOne(query, updateDoc, option)
            res.send(result)
        })
        app.put('/likecount', async(req, res) => {
            const id = req.query.id
            const query = { _id: ObjectId(id) }
            const body = req.headers
            const option = {upsert:true}
            const updateDoc= {
                $set: {
                    like:body.like
                }
            }
            const result = await publicCollection.updateOne(query,updateDoc,option)
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