const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        //require: true, 
        // unique: true
    }, 
    email: {
        type: String,
        // require: true,
        // unique: true
    },

    password: {
        type: String,
        // require: true,
        // unique: true
    }
}, 
//{timestamps: true}
);

module.exports = mongoose.model("Users", UserSchema);