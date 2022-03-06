/*Mlter is a node.js middleware for handling multipart/form-data, 
which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.*/

const multer = require ('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/storage/images')
      
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      cb(null, `${file.fieldname}-${uniqueSuffix}.png`)

      }
  })
  


  const upload = multer({ storage })
  

  module.exports = upload