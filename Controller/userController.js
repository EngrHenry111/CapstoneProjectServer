
const blogPostModel = require('../Model/blogPostsModel');
const userModel = require("../Model/userModel");
const bcrypt = require("bcryptjs"); // For password hashing

// Create User
exports.createUser = async (req, res) => {
    try {

       const getUserId = await  blogPostModel.findById(req.params.postsId)
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ 
            message: "All fields are required" });
        }

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

        // Hash Password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create User
        const newUser = await userModel.create({
            userName,
            email,
            password: hashedPassword, // Store hashed password
        });


        getUserId.User.push(newUser?._id);
        getUserId.save();

        return res.status(200).json({
            message: "Sign up successfully",
            data: newUser,
        });

    } catch (error) {
        console.error("Sign up error:", error);
        return res.status(400).json({
            message: "Unable to sign up.\nTry again",
            error: error.message,
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
            return res.status(401).json({
                 message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                 message: "Invalid email or password" });
        }

        return res.status(200).json({
            message: "Login Successful",
            data: user,
        });

    } catch (error) {
        return res.status(400).json({
            message: "Login failed",
            error: error.message,
        });
    }
};

//User Logout
exports.UserLogout = async (req, res) => {
    try {
        return res.status(200).json({
             message: "Logout successful" });
    } catch (error) {
        return res.status(400).json({
            message: "Logout failed",
            error: error.message,
        });
    }
};

// exports.UserLogout = async (req, res) => {
//     try {
//         // If using session-based authentication
//         if (req.session) {
//             req.session.destroy(err => {
//                 if (err) {
//                     return res.status(500).json({
//                         message: "Logout failed",
//                         error: err.message,
//                     });
//                 }
//                 return res.status(200).json({
//                     message: "Logout successful"
//                 });
//             });
//         } else {
//             return res.status(200).json({
//                 message: "Logout successful"
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             message: "Logout failed",
//             error: error.message,
//         });
//     }
// };



exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from URL params

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(400).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(400).json({
            message: "Failed to delete user",
            error: error.message
        });
    }
};





