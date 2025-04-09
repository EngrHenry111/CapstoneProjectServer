
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/'); 
  },          
  filename: function  (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, and .png files are allowed'), false);
  }
};

const limits = { fileSize: 5 * 1024 * 1024 }; 

const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = upload;
