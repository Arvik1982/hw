const { request, response } = require("express");
const User = require('../models/user')

const getUsers=(request, response)=>{
    //get all users
return User.find({}).then((data)=>{response.status(200).send(data)})
}
const getUser=(request, response)=>{
    //get user
    const {user_id}=request.params

    return User.findById(user_id).then((user)=>{
     if(user===null)   {response.status(400).send('no user id')}
     else{response.status(200).send(user)}
    
    }).catch((e)=>{ response.status(500).send(e.message)})

}
const createUser=(request, response)=>{
    //create new user
 
return User.create({...request.body}).then((user)=>{response.status(201).send(user)}).catch((e)=>{ response.status(500).send(e.message)})

}

const updateUser=(request, response)=>{
    //update user
const {user_id}=request.params
return User.findByIdAndUpdate(user_id, {...request.body}).then((user)=>{response.status(200).send(user)}).catch((e)=>{ response.status(500).send(e.message)})    
}

const deleteUser=(request, response)=>{
    //delete user
const {user_id}=request.params
return User.findByIdAndDelete(user_id).then((user)=>{
if(user===null){response.status(400).send('no user to delete')}
else{response.status(200).send('deleted')}    

}).catch((e)=>{ response.status(500).send(e.message)}) 
}

module.exports ={
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}