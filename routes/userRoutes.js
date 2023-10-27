const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


const auth = require("../middleware/jwt"); 
// Create a new user
router.post('/createUser', userController.createUser);


// Signup a new user
router.post('/signup', userController.signup);


// Login a user
router.post('/login', userController.login);

// Authenticate user for the following routes
router.use(auth);
// Retrieve all users
router.get('/getAllUsers', userController.getAllUsers);

// Retrieve a specific user by ID
router.get('/getUserById/:id', userController.getUserById);

// Update a user by ID
router.put('/updateUser/:id', userController.updateUser);

// Delete a user by ID
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;
