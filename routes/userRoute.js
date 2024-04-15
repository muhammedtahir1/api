const express = require('express');

const router = express.Router();

// importing userModel
const User = require('../models/userModel')

// importing Controller
const {createUser, getUsers, getUser, updateUser, deleteUser} = require('../controllers/userController')


// ROUTES
// Send data to the database using Postman
router.post('/user', createUser)


// Fetch data from database
router.get('/users', getUsers)


// Fetch data using ID
router.get('/user/:id', getUser)


// To update or edit data in database
router.put('/user/:id', updateUser)


// Delete data from database
router.delete('/user/:id', deleteUser)
router.get('/todos', (req, res)=>{
    res.json([{id: 1, name: 'Go to gym'},{id: 1, name: 'Go to gym'}])
})


module.exports = router;