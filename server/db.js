require('dotenv').config()

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://nata:1111@cluster0.spegu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db(process.env.DB_NAME).collection("users");
  // perform actions on the collection object
  console.log(collection)
  client.close();
});
