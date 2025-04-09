const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,

    },

    subtitle: {
        type: String,
    },

    content: {
        type: String,
    },

    imageUrl: {
        type: String,
    },

    Users:[ {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",

    },],
}//,
//{timestamps: true}
);
module.exports = mongoose.model('Posts', blogPostSchema);