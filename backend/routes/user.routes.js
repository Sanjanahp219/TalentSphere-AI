const express = require('express');
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// All user actions require authentication.
router.use(authenticate);

// Maps to GET /api/users/search?q=value
router.get('/search', userController.searchUsers);

exports = module.exports = router;
