const jwt = require('jsonwebtoken');
const JWT_SECRET = 'chandigarhPB@123';
const user = require('../models/User');


const isAuthenticatedUser = (req,res,next)=>{
   const token = req.cookies?.token;
   if(!token) {
         return res.status(401).json({message:"please login to access this resource"});
   } 
   try {
    const decodedData = jwt.verify(token,JWT_SECRET);

   req.user = { id: decodedData.user.id }
   next();
   } catch (error) {
       return res.status(401).json({success:false,message:'Invalid or expired token'});
   }

};

module.exports = isAuthenticatedUser;