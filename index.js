const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:5173",
        "https://jovial-sunshine-92b406.netlify.app"
    ]
}));
app.use(express.json());


// products
// J22Uvxd0QdGYfaSH

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_PRODUCTS}:${process.env.DB_PASS}@cluster0.k7dzav4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        const productsCollection = client.db('productsDB').collection('products');


        app.get('/products', async (req, res) => {

            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);

            console.log('pagination', req.query);

            const result = await productsCollection.find()
                .skip(page * size)
                .limit(size)
                .toArray();
            res.send(result);
        });

        app.get('/productsCount', async (req, res) => {
            const count = await productsCollection.estimatedDocumentCount();
            res.send({ count })
        })



        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('JobTask Server is running.');
});

app.listen(port, () => {
    console.log(`JobTask server is running on ${port}`);
});