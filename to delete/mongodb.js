




// ------ this file only for explaning



// create CRUD app

const { MongoClient, ObjectID, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://localhost:27017';
const dbName = 'task-manager';

const id = new ObjectID();
console.log(id);

MongoClient.connect(connectionURL, { useNewUrlParser:true }, (error,client)=>{
    if(error){
        return console.log('Unable to connect to Database');
    }

    const db = client.db(dbName)





    

//-------------------------------------CREATE-----------------------------
//use insertOne : 

    // db.collection('users').insertOne({
    //     _id: id,
    //     name : 'noor',
    //     age  : 22
    // })
//----------------------------------------------
// use insertMany : 

    // db.collection('task').insertMany([
    //     {
    //     task : 'study node',
    //     completed : true
    //     },
    //     {
    //         task: 'clean your room',
    //         completed : false
    //     },
    //     {
    //         task : 'have some fun',
    //         completed : true
    //     }
    // ],(error,result)=> {
    //   if(error){
    //       return console.log('Unable to insert task');
    //   }  

    //   console.log(result.ops); // ops not working anymore
    // })

//-------------------------------------READ-----------------------------
// use findOne:

    // db.collection('task').findOne({task:'study node'},(error, user)=>{
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user);
    // })

// another example :

    // db.collection('users').findOne({_id: new ObjectID('61db95770560fa1744248473')},(error, user)=>{
    //     if(error){
    //                 return console.log('Unable to fetch');
    //             }
    //              console.log(user);
    //         }
    // )
//----------------------------------------------
        //use find : (find return a cursor that point to the object but not the oblect itself)

        // db.collection('task').find({completed: true}).toArray((error, user)=>{
        //     console.log(user);
        // })

//-------------------------------------UPDATE-----------------------------
//use updateOne :

// db.collection('task').updateOne(
//     {
//         _id: new ObjectID('61db95770560fa1744248476')
//     },
//     {
//         $set : {
//             task : 'Swim at the ouccen'
//         }
//     }).then((result)=>{
//         console.log(result);
//     }).catch((error)=>{
//         console.log(error);
//     })

// use updateMany : 

// db.collection('task').updateMany(
//         {
//         completed: false 
//         }, 
//         { 
//         $set : {
//         completed : true 
//         }
//     }).then((result)=>{
//         console.log(result);
//     }).catch((error)=>{
//         console.log(error);
//     })


//-------------------------------------DELETE-----------------------------
// use deleteOne : 

// db.collection('users').deleteOne({
//     name : 'noor'
// }).then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// })

// use deleteMany: 

// db.collection('users').deleteMany({
//     age : 27
// }).then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// })




    console.log('Connect correctly');

})

