const blogPostsContrller = require('../Controller/blogPostController');
const express = require('express');

const blogPostsRoute = express.Router();


blogPostsRoute.post('/posts/:userId', upload.single("productImage"), blogPostsContrller.createPosts)
blogPostsRoute.get('/allPost', blogPostsContrller.getAllPosts);
blogPostsRoute.get('/singlePost', blogPostsContrller.getOnePostsById);
blogPostsRoute.delete('/deletePost', blogPostsContrller.deletePosts);
blogPostsRoute.patch('/deletePost', blogPostsContrller.updatePost);


blogPostsRoute.post("/create-users/:postsId")
module.exports = blogPostsRoute;