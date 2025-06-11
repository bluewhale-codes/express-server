const jwt = require('jsonwebtoken');
const sendtoken = (data,JWT_SECRET,statusCode,res)=>{
    const jsontoken = jwt.sign(data,JWT_SECRET,{expiresIn:'1h'})

    const options = {
        expires:new Date(Date.now()+2*24*60*60*1000),
        secure:false,
         sameSite: 'Lax',
        httpOnly:true,
    };

    res.status(statusCode).cookie('token',jsontoken,options).json({
        success:true,
        jsontoken,
        user:data.userD
    })
}


module.exports = sendtoken;