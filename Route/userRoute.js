const userController = require('../Controller/userController');
const express = require('express');

const userRoute = express.Router();

userRoute.post('/new-users', userController.createUser);
userRoute.post('/login', userController.UserLogin );
userRoute.post('/logout', userController.UserLogout );

//blogPostsRoute.post("/create-users/:postsId")
module.exports = userRoute;