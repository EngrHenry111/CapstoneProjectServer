const userController = require('../Controller/userController');
const express = require('express');

const userRoute = express.Router();

userRoute.post('/new-users', userController.createUser);
userRoute.post('/login', userController.UserLogin);
userRoute.post('/logout', userController.UserLogout);

userRoute.patch('/updateUser/:id', userController.updateUser);
userRoute.get('/getAllUsers/', userController.getAllUsers);

module.exports = userRoute;
  
//:postsId',upload.single("imageUrl"),