const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../db/models/users')
const auth = require('../middleware/auth')
const {sendWelcomeEmail, sendFarewellEmail} = require('../emails/account')
const router = new express.Router()


// User : 

//create user : 
router.post('/users', async (req,res)=>{

    const user = new User(req.body)
    
    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send( { user:user, token:token } )
    } catch (e) {
        res.status(400).send(e)
    }
})

//login user:
router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    } catch (e) {
        res.status(400).send()
    }
})

//logout current user
router.post('/users/logout',auth ,async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//logout all user
router.post('/users/logoutAll',auth , async (req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        
        res.send()

    } catch (e) {
        res.status(500).send()
    }
} )


// read profile
router.get('/users/me', auth, async (req,res)=>{
    res.send(req.user)
})

// FILE UPLOAD (CRUD) : 

//(C/U) upload avater or image
const upload = multer({
    //dest : 'avater', // this will create a folder in root dirctory
    limits : {
        fileSize : 1000000
    },
    fileFilter (req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avater', auth, upload.single('avater'), async (req,res)=>{ // the "avater" in upload.single is the name if the file that the multer will look for , its different from the avater writting in router.
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avater = buffer
    await req.user.save()
    res.send()
}, (error,req,res,next)=>{
    res.status(400).send({ error : error.message})
})

//(D) delete avater
router.delete('/users/me/avater', auth, async (req,res)=>{
    req.user.avater = undefined
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({ error : error.message})
})

//(R) Fetch user avater 
router.get('/users/:id/avater', async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        
        if(!user || !user.avater){
        throw new Error()
    }

    res.set('Content-Type','image/png')
    res.send(user.avater)

    } catch (e) {
        res.status(404).send()
    }
})


// update user profile
router.patch('/users/me', auth , async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["name", "email", "age","password"]
    const isUpdateValid = updates.every((update)=>{
        return allowedUpdate.includes(update) // every will only return true if all result return true
    })

    if(!isUpdateValid){
        return res.status(400).send({ error: 'invalid update'})
    }

    try {
        updates.forEach((update)=>{
            req.user[update] = req.body[update]  
        })

        await req.user.save() // line 75 to 79 is the new change to make sure that the patch will not bypass the meddleware as before the change. 
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true }) // this line was before the new change right up there.
        // meaning of : (runValidators : true)  is that the condition we put on our model will apply when we do the patch here. 
        // but we connebt this command now cuz it bybass the mongoose meddilware meaning it will pass the hashcode for password we set on meddilewar.
        
        
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// delete user profile: 
router.delete('/users/me',auth, async (req,res)=>{
    
    try {
        await req.user.remove()
        sendFarewellEmail(req.user.email,req.user.name)
        res.send(req.user)

    } catch (e) {
        res.status(500).send(e)
    }

})



module.exports = router