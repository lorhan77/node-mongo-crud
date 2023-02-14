const { MongoClient } = require("mongodb");
 
let singleton;
 
async function connect() {
    if (singleton) return singleton;
 
    const client = new MongoClient(process.env.MONGO_HOST);
    await client.connect();
 
    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

const COLLECTION = "clientes";
 
async function findAll() {
    const db = await connect();
    return db.collection(COLLECTION).find().toArray();
}
 
async function insert(cliente) {
    const db = await connect();
    return db.collection(COLLECTION).insertOne(cliente);
}
 
const ObjectId = require("mongodb").ObjectId;
async function findOne(id) {
    const db = await connect();
    return db.collection(COLLECTION).findOne(new ObjectId(id));
}

async function update(id, cliente) {
    const db = await connect();
    return db.collection(COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: cliente });
}
 
module.exports = { findAll, insert, findOne, update }