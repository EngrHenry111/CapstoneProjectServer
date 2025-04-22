
const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dicujnqf0', //enter your cloud name 
  api_key: '619189682733324', //enter your api_key
  api_secret: 'VKR7a6skt8We_0oYJH_C-b_Y1es', //enter your api_secret
  secure: true
});


module.exports = cloudinary