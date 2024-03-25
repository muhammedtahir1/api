const express = require('express')
const app = express();
const mongoose = require('mongoose')

// importing userModel
const User = require('./models/userModel')

// middleware

app.use(express.json());

// routes
app.get('/', (req,res)=>{
    res.send("Hello Node API from backend!")
})

app.get('/blog', (req,res)=>{
    res.send("Hello Blog route!")
})

// Send data to the database using Postman
app.post('/user', async(req,res)=>{
    try {
        const user = await User.create(req.body)  // Didn't get this entire post route
        res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});  // WHY???
    }
})

// Fetch data from database

app.get('/users', async (req,res)=>{
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message});  // WHY???
    }
})

// Fetch data using ID
app.get('/user/:id', async (req,res)=>{
    try {   
        const {id} = req.params;        // why {} for id ?
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({message: error.message}); //why
    }
})

// To update or edit data in database

app.put('/user/:id', async (req,res)=>{
    try {
        const {id} = req.params;  //why {} for id ?
        const user = await User.findByIdAndUpdate(id, req.body);
        // if user not there in the database
        if(!user){
            return res.status(404).json({message: `Cannot find user with id ${id}`});
        }
        
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Delete data from database

app.delete('/user/:id', async (req,res)=>{
    try {
       const {id} = req.params;
       const user = await User.findByIdAndDelete(id);
       // if user not there in db
       if(!user){
        return res.status(404).json({message: `cannot find any user with id ${id}`});
       }
       res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// MongoDB

mongoose.
connect('mongodb+srv://admin:admin12345@api1.yvqdxav.mongodb.net/Node-API?retryWrites=true&w=majority&appName=API1')
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(3000, ()=>{
        console.log("Server is running on port 3000");
    });
})
.catch((error)=>{
    console.log(error);
    console.log("Could not connect to MongoDB");
})