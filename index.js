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
        // await client.connect();
        const database = client.db("productsDB");
        const ProductCollection = database.collection("products");
        //start out Project-->

        app.get('/products', async(req, res) => {
            const couser = ProductCollection.find();
            const result = await couser.toArray()
            res.send(result)
        });
        app.get('/products/:Brand', async(req, res) => {
            const brand = req.params.Brand;
            const query = { Brand: brand };
            const course = ProductCollection.find(query);
            const result = await course.toArray();
            res.send(result)
        });
        app.get('/products/Brand/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await ProductCollection.findOne(query);
            res.send(result)
        });
        app.get('/cards', async(req, res) => {
            const couser = ProductCollection.find();
            const result = await couser.toArray()
            res.send(result)
        })
        app.post('/cards', async(req, res) => {
            const item = req.body;
            const result = await ProductCollection.insertOne(item);
            res.send(result)
        });
        app.post('/products', async(req, res) => {
            const productitem = req.body;
            const result = await ProductCollection.insertOne(productitem);
            res.send(result);
        });
        app.put('/products/:id', async(req, res) => {
            const id = req.params.id;
            const item = req.body;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateitem = {
                $set: {
                    name: item.name,
                    Brand: item.Brand,
                    Price: item.Price,
                    photo: item.photo,
                    rating: item.rating,
                    description: item.description,
                    categoryitem: item.categoryitem,
                }
            };
            const result = await ProductCollection.updateOne(filter, updateitem, options);
            res.send(result)

        });
        app.get('/cards/:email', async(req, res) => {
            const emailid = req.params.email;
            const query = { email: emailid };
            const course = ProductCollection.find(query);
            const result = await course.toArray();
            res.send(result)
        });

        app.delete('/cards/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await ProductCollection.deleteOne(query);
            res.send(result)
        });



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// app.get('/', (req, res) => {
//     res.send('Hello World! i am hassan')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})