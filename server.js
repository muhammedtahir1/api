const express = require('express')
const app = express();
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoute')

// Custom error middleware
const errorMiddleware = require('./middleware/errorMiddleware')

// dotenv
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000

// importing userModel
// const User = require('./models/userModel')


// middleware
app.use(express.json());


// routes
app.get('/', (req,res)=>{
    throw new Error('fake error')
    // res.send("Hello Node API from backend!")
})

app.get('/blog', (req,res)=>{
    res.send("Hello blog route from backend!")
})

app.use('/api', userRoutes)


// app.use(errorMiddleware);


// MongoDB

mongoose.
connect(MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
    console.log("Could not connect to MongoDB");
})