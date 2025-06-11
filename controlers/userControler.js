const User = require('../models/User');
const bcrypt = require('bcrypt');
const sendtoken = require('../utils/jwt');
const JWT_SECRET = 'chandigarhPB@123';

const createUser = async (req,res)=>{
    try {
        const {fullName,email,password,phone} = req.body;

        // check existing user using unique email;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message:"User Already exist with this email."});
        }
        const newUser =  new User({fullName,email,password,phone});
        await newUser.save();

        const data = {
         userD:newUser,
         user:{
             id:newUser.id
          }
        }
        sendtoken(data,JWT_SECRET,200,res);
        
    } catch (error) {
        console.error("Error while creating User",error);
        res.status(500).json({message:'Server Error'});
    }
}

const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json({
            success:true,
            user:req.user,
            count:users.length,
            data:users,
        });
    } catch (error) {
        console.error('Error while fetching users:',error);
        res.status(500).json({success:false,message:'server error'});
    }
}
const getGoogleProfile = async (req,res)=>{
    if (!req.user) return res.json({message:'Please login'});
  
  res.json(req.user);
}


// login function
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:'Email or password is required'});
    }
    try {
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({message:'Invalid password or email'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid password or email'});
        }

        // res.status(200).json({
        //     message:'Login successful',
        //     user:{
        //         id:user._id,
        //         fullName:user.fullName,
        //         email:user.email,
        //         phone:user.phone,
        //     }
        // })

        const data={
            userD:user,
            user:{
                id:user.id
            }
        }
        sendtoken(data,JWT_SECRET,200,res);
    } catch (error) {
        console.error("Login error",error);
        res.status(500).json({message:'Server error'});
    }
}


const getUserDetails = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id);
       res.status(200).json({
        success:true,
        user:user,
    })
    } catch (error) {
        res.status(500).json({message:'server error'});
    }
}

module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    getGoogleProfile,
    getUserDetails
}