const blogPostsController = require('../Controller/blogPostController');
const express = require('express');
const upload = require("../config/multer")
const blogPostsRoute = express.Router();



blogPostsRoute.post('/UploadPosts', upload.single("imageUrl"), blogPostsController.createPosts)
blogPostsRoute.get('/allPost', blogPostsController.getAllPosts);
blogPostsRoute.get('/singlePost/:id', blogPostsController.getOnePostsById);
blogPostsRoute.delete('/deletePost/:id', blogPostsController.deletePosts);
blogPostsRoute.patch('/updatePost/:id', blogPostsController.updatePost);

// blogPostsRoute.post("/create-post/:postId")

module.exports = blogPostsRoute;

