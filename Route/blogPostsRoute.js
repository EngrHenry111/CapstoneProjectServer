const blogPostsController = require('../Controller/blogPostController');
const express = require('express');
const upload = require("../config/multer")
const blogPostsRoute = express.Router();


blogPostsRoute.post('/UploadPosts', upload.single("imageUrl"), blogPostsController.createPosts)
blogPostsRoute.get('/allPost', blogPostsController.getAllPosts);
blogPostsRoute.get('/singlePost', blogPostsController.getOnePostsById);
blogPostsRoute.delete('/deletePost', blogPostsController.deletePosts);
blogPostsRoute.patch('/deletePost', blogPostsController.updatePost);



module.exports = blogPostsRoute;

