const Product = require("../models/Product");
const cloudinary = require('cloudinary');
const multer = require('multer')
const storage = multer.memoryStorage(); // or use diskStorage for file uploads
const upload = multer({ storage });


const createProduct =async(req,res,next)=>{
       try{
        let images = []
        console.log(req.body);
     
       if(typeof req.body.images === "string"){
         images.push(req.body.images);
       }else{
           images = req.body.images
       }
    
     
           const imagesLink = [];
           for (let i = 0; i < images.length; i++) {
               const result =  await cloudinary.v2.uploader.upload(images[i],{
                   folder:"products"
               })

               imagesLink.push({
                   public_Id:result.public_id,
                   url:result.secure_url
               }) 
           }
         
     
            req.body.images = imagesLink;
            
     
    
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product,
        
    })
       } catch(error){
           console.error("Error while creating User",error);
           res.status(500).json({message:'Server Error'});
       }
};

module.exports = {createProduct}