require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://UranDias:QTvJRURNkKeRzLF1@fitness-app.relis.mongodb.net/?retryWrites=true&w=majority&appName=fitness-app";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect()
  .then(() => {
    console.log("Connected to MongoDB!");
    return client.db("admin").command({ ping: 1 });
  })
  .then(() => {
    console.log("Pinged MongoDB successfully!");
    client.close();
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
