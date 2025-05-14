

 //const blogPostModel = require('../Model/blogPostsModel');
const userModel = require("../Model/userModel");
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

// Create User
exports.createUser = async (req, res) => {
    try {
    
       //const getPostId = await blogPostModel.findById(req.params)
       const { userName, email, password } = req.body;

        if (!userName){
            return res.status(200).json({
                message: "User name require here",
            });
       
        } else if (!email){
            return res.status(201).json({
                message: "Email require here"
            });
        }else if (!password){
            return res.status(202).json({
                message: "Password require here"
            });
        }
        //check existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
          return res.status(409).json({
             message: "Email already in use" 
            });
        }

        // Hash Password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create User
        const newUser = await userModel.create({
            userName,
            email,
            password: hashedPassword, // Store hashed password
        });


        // getPostId.author.push(newUser?._id);
        // getPostId.save();

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            JWT_SECRET,
            {expiresIn: "7d"}
          );

          const {password: _, ...sanitizedUser } = newUser._doc;

          return res.status(200).json({
            message: "Sign up successfully. Explore",
            token,
            user: sanitizedUser,
          });

    }
    catch (error) {
      console.error(" Signup failed with error stack: ", error.stack);
      return res.status(400).json({
        message: "Unable to sign up.\n Check and try again",
        error: error.stack,
      });
    }
};

// User Login


exports.UserLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
           message: "Email and password are required" });
      }
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }  
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
  
      const { password: _, ...sanitizedUser } = user._doc;
  
      return res.status(200).json({
        message: "Login successful",
        token,
        user: sanitizedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Login failed",
        error: error.message,
      });
    }
  };



exports.UserLogout = async (req, res) => {
    try {
        // If using session-based authentication
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    return res.status(500).json({
                        message: "Logout failed",
                        error: err.message,
                    });
                }
                return res.status(200).json({
                    message: "Logout successful"
                });
            });
        } else {
            return res.status(200).json({
                message: "Logout successful"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Logout failed",
            error: error.message,
        });
    }
};









