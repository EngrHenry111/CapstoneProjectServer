const blogPostsController = require('../Controller/blogPostController');
const express = require('express');

const blogPostsRoute = express.Router();


blogPostsRoute.post('/posts', blogPostsController.createPosts)
blogPostsRoute.get('/allPost', blogPostsController.getAllPosts);
blogPostsRoute.get('/singlePost', blogPostsController.getOnePostsById);
blogPostsRoute.delete('/deletePost', blogPostsController.deletePosts);
blogPostsRoute.patch('/deletePost', blogPostsController.updatePost);



module.exports = blogPostsRoute;

///:postsId', upload.single("imageUrl")