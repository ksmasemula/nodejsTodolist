const express = require("express");
const itemsRouter = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
const { isObject } = require("mongodb/lib/utils");
const dbUrl ='mongodb+srv://kabelo:$hadrackDa2nd@cluster0.fqxat.mongodb.net/?retryWrites=true&w=majority';
const dbName ="emedb";

async function getCollection(collectionName){
    return new Promise(async (resolve,reject)=>{
        const client = new MongoClient(dbUrl);
        await client.connect();
    
        const admin = client.db(dbName).admin();
        const db = client.db(dbName);
        // const db = getDBConnection();
        const response = db.collection(collectionName).find();

        resolve (response.toArray());
        // client.close();

    });
}

async function save(tableName,task){
    const client = new MongoClient(dbUrl);
    await client.connect();
  
    const admin = client.db(dbName).admin();
    const db = client.db(dbName);
    // const db = getDBConnection();
    const response = await db.collection(tableName).insertOne(task);
   
    return response;
    client.close();
}

itemsRouter.route("/items")
    .get(async(req,res)=>{
        let tasks = await getCollection("todoList");


        return res.json({
            tasks: tasks
        })
    })
    .post(async(req,res)=>{

        let task = req.body.task;

        let saveTask = await save("todoList",task);
        let tasks = await getCollection("todoList");


        return res.json({
            tasks: tasks
        })
    })

module.exports = itemsRouter;