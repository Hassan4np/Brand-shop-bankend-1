const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
//env dataload ar jono
require("dotenv").config()
const port = process.env.PORT || 5000;
//middle wire
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://BrandShops:itGRogvjv0jNZeLO@cluster0.uruvxpx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db("productsDB");
        const ProductCollection = database.collection("products");
        //start out Project-->

        app.get('/products', async(req, res) => {
                const couser = ProductCollection.find();
                const result = await couser.toArray()
                res.send(result)
            })
            // app.get('/products/:id', async(req, res) => {
            //     const item = req.params.id;
            //     // const query = { _id: new ObjectId(item) };
            //     const query = {
            //         Brand: item
            //     };
            //     const couser = ProductCollection.find(query);
            //     const result = couser.toArray();
            //     res.send(result)

        // })

        app.post('/products', async(req, res) => {
            const productitem = req.body;
            console.log(productitem)
            const result = await ProductCollection.insertOne(productitem);
            res.send(result);
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World! i am hassan')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})