const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const { response } = require('express')

const app = express()
const port = process.env.PORT


// app.use((req,res,next)=>{
//     //console.log(req.method,req.path);
//     res.status(503).send('the website is under maintanance, please come back later')
// })


app.use(express.json())// this make the req.body on the request an object so we can be created from the req.body 
app.use(userRouter)
app.use(taskRouter)




app.listen(port, ()=>{
    console.log('Server is up on port '+ port);
})



// how populate work : 

// const Task = require('./db/models/tasks')
// const User = require('./db/models/users')

// const main = async () =>{
    //find user by its task : 

    // const task = await Task.findById('61ee1b62d56c6cc92ccc29f4')
    // await task.populate('owner')
    // console.log(task.owner);

    // //find task by its user: 

    // const user = await User.findById('61ee19e4e0889ec427fed50d')
    // await user.populate('tasks')
    // console.log(user.tasks);


// }

// main()