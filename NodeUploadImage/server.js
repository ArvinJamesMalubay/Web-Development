const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb(null, 'C:/Users/valen/Desktop/NodeUploadImage/uploaded_image')
    cb(null, 'T:/3rd Year Compilation/3rd Year Second Sem/Web Development/NodeUploadImage/uploaded_image')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // 1MB
});


const app = express();

app.post('/upload', upload.single('image'), function (req, res) {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }

  // Do something with the file, like save it to a database or process it

  res.send('File uploaded successfully');
});


app.listen(3000, function () {
  console.log('Server started on port 3000');
});
