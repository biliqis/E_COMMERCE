
const { v4: uuidv4 } = require('uuid');
import multer from "multer";
import aws from 'aws-sdk'
import { any, string } from "joi";
const multerS3 = require('multer-s3')


const s3 = new aws.S3({
  accessKeyId: process.env.AWS_Access_Key_Id,
    secretAccessKey: process.env.AWS_Secret_Key
});

const multerStorage = multer.diskStorage({
    destination: (req:any, file:any, callback:any) => {
        callback(null, "");
    },
    filename: (req, file, callback) => {
        const extension = file.mimetype.split("/")[1];
        const originName = file.originalname.split(" ")[0].trim();
        console.log(originName)
        callback(null, `shoppincart-${originName}-${Date.now()}.${extension}`);
    }
})
   
const multerFilter = (req:any, file:any, cb:any) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    } else {
        return cb(new Error("Please upload an image of type, jpg/jpeg/png"), false);
    }
}

const upload = multer({
    fileFilter:multerFilter,
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME!,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req:any, file:any, cb:any) => {
        cb(null, { fieldName: file.fieldname})
      },
      key: (req:any, file:any, cb:any) => { 
        cb(null, `${"shoppincart"}/${uuidv4()}` + file.originalname)
      }
    })
  })

export default upload;