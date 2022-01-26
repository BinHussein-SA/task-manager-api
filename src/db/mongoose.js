const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true
})





// const User = mongoose.model('User', 
// {
//     name : {
//         type : String
//     }, 
//     age : {
//         type : Number
//     }
// })

// const me = new User({
//    name : 'Mohmmad',
//    age : 27 
// })

// me.save().then(()=>{
//     console.log(me);
// }).catch((error)=>{
//     console.log('Error',error);
// })


const Task = mongoose.model('task',{

    description : {
        type: String
    },
    completed : {
        type : Boolean
    }

})

// const myTask = new Task({
//     description : 'study at starbucks',
//     completed : true
// })

// myTask.save().then((result)=>{
// console.log(result);
// }).catch((error)=>{
//     console.log('Error', error);
// })