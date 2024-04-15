const User = require('../models/userModel')

const errorMiddleware = require('../middleware/errorMiddleware')
// error handler
const asyncHandler = require('express-async-handler')


// Send data to the database using portman
const createUser = asyncHandler(async(req,res)=>{
    try {
        const user = await User.create(req.body)  // Didn't get this entire post route
        res.status(200).json(user);

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// Fetch data from database
const getUsers = asyncHandler(async (req,res)=>{
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// Fetch data from database using ID
const getUser = asyncHandler(async (req,res)=>{
    try {   
        const {id} = req.params;        // why {} for id ?
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// To update or edit data
const updateUser = asyncHandler(async (req,res)=>{
    try {
        const {id} = req.params;  //why {} for id ?
        const user = await User.findByIdAndUpdate(id, req.body);
        // if user not there in the database
        if(!user){
            res.status(500)
            throw new Error(`cannot find any user with id ${id}`);
        }
        
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);    
    }
})

// To delete data from database using ID
const deleteUser = asyncHandler(async (req,res)=>{
    try {
       const {id} = req.params;
       const user = await User.findByIdAndDelete(id);
       // if user not there in db
       if(!user){
        res.status(500)
        throw new Error(`cannot find any user with id ${id}`);
       }
       res.status(200).json(user);
    } catch (error) {
        res.status(500)
        throw new Error(error.message);
    }
})






module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}