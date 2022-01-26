require('../../src/db/mongoose')

const Task = require('../../src/db/models/tasks')

// Task.findByIdAndDelete('61e8d7a323fb55e7e55fd0a6').then((task)=>{
//     console.log(task + ' has been deleted'); // task will return null cuz its deleted
//     return Task.countDocuments({completed : false})
// }).then((result)=>{
//     console.log("uncompleted task is : "+ result );
// }).catch((e)=>{
//     console.log(e);
// })

const deleteTaskAndCount = async (id)=>{
    const deletedTask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed : false})
    return count
}

deleteTaskAndCount('61e8d79623fb55e7e55fd0a4').then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})