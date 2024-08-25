const express = require('express');
const router = express.Router();
const UserServise = require('../services/users');

// Create a new user
router.post('/', UserServise.createUser);

// Get a user by ID
router.get('/:id', UserServise.getUser);

// Get all users
router.get('/', UserServise.getUsers);

module.exports = router;
