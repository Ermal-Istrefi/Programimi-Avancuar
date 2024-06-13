const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/', userController.authMiddleware(['admin']), userController.getAllUsers);
router.get('/:id', userController.authMiddleware(['admin']), userController.getUserById);
router.put('/:id', userController.authMiddleware(['admin']), userController.updateUser);
router.delete('/:id', userController.authMiddleware(['admin']), userController.deleteUser);

module.exports = router;
