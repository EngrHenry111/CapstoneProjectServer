
const blogPostModel = require('../Model/blogPostsModel');
const cloudinary = require('../config/cloudinary')


exports.createPosts = async(req , res)=>{
    try {
      
        const { imageUrl, title, subtitle, content} = req.body;
         
       
        const upload = await cloudinary.uploader.upload(req.file.path)
        const Posts = await blogPostModel.create({
            imageUrl: upload.secure_url,
            title,
            subtitle,
            content
           
        });
        return res.status(201).json({
            message: "See all the posts here",
            data: Posts,
        });
     
        
    } catch (error) {
        console.error("couldn't found posts here" , error)
    }
      };





      exports.getAllPosts = async (req, res) => {
        try {
          
          const allPosts = await blogPostModel.find();
          return res.status(200).json({
            message: 'gotten all posts',
            data: allPosts,
          });

        } catch (error) {
          return res.status(400).json({
            message: "couldn't get posts",
            error,
          });
        }
      };

      
      exports.getOnePostsById = async (req, res) => {
        try {
    
          const {id} = req.params
       const singlePosts = await blogPostModel.findById({id});
          return res.status(200).json({
            message: 'gotten posts',
            data: singlePosts,
          });
        } catch (error) {
          return res.status(400).json({
            message: "couldn't get posts",
            error,
          });
        }
      };



      exports.deletePosts = async (req, res) => {
        try {
          const deletePosts = await blogPostModel.deleteById(req.params.id);
          return res.status(200).json({
            message: 'Posts deleted',
            data: deletePosts,
          });
        } catch (error) {
          return res.status(400).json({
            message: "couldn't delete Posts",
            error,
          });
        }
      };

      

      exports.updatePost = async(req, res)=>{
        try {
          const {id} = req.params
          const { title, subtitle, content} = req.body

          const postsUpdates = await blogPostModel.findByIdAndUpdate(id ,
             {title, subtitle, content} ,
             {new:true})
          return res.status(202).json({
          message : "Posts updated",
          data : postsUpdates
          });
        } catch (error) {
          return res.status(400).json({
            message : "failed to update posts",
            error
          });
        }
    };



