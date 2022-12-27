const express = require('express');
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
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