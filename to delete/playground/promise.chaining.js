require('../src/db/mongoose')
const User = require('../src/db/models/users')

// User.findByIdAndUpdate('61e784a81775b7d35f8c35bc', {age : 27}).then((user)=>{
//     console.log(user);
//     return User.countDocuments({age : 27})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e);
// })


const updateAgeAndcount = async (id, age)=>{
    const user = await User.findByIdAndUpdate(id, {age : age})
    const count = await User.countDocuments({age : age})
    return count
}

updateAgeAndcount('61e784a81775b7d35f8c35bc',28).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})