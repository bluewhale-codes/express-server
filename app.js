const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes')
const passport = require('passport');
require('./passport'); 
const session = require('express-session');
const cors = require('cors');
const sendtoken = require('./utils/jwt')
const JWT_SECRET = 'chandigarhPB@123';
const cookieParser = require('cookie-parser');


app.use(cors({
  origin: 'http://localhost:3000',
  origin:'http://localhost:5500', // your frontend URL
  credentials: true                // ⬅️ allow cookies
}));
app.use(cookieParser());
app.use(express.json());

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'lax', // or 'none' with https
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Start Google login
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account', // <== Forces account selection
  })
);


// Handle Google callback
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    
  }),
  (req, res) => {
     //const jsontoken = jwt.sign(data,JWT_SECRET,{expiresIn:'1h'})
      const token = jwt.sign({user:{ id: req.user._id }},JWT_SECRET,{expiresIn:'1h'});
      const options = {
          expires:new Date(Date.now()+2*24*60*60*1000),
          secure:false,
          sameSite: 'Lax',
          httpOnly:true,
      };

    res.status(200).cookie('token', token,options);
       

  // Redirect to frontend or dashboard
  res.redirect('http://localhost:3000/');
  }
);

// Protected route
app.get('/dashboard', (req, res) => {
  if (!req.user) return res.redirect('/auth/google');
  res.json({message:'login success'});
});

// Logout
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    // Optionally destroy session if you're using sessions
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // or your custom cookie name
      res.redirect('/'); // Redirect to homepage or login
    });
  });
});
app.get('/profile', (req, res) => {
  if (!req.user) return res.redirect('/auth/google');
  
  res.json({
    message: 'Logged in user info',
    user: req.user,
  });
});





require('dotenv').config();

app.use('/api',userRoutes);

// Sample route
app.get('/', (req, res) => {
  res.json("Hello world this is vishal shakya");
});



app.get('/user' , async(req,res)=>{
    try {
      const users = await  User.find();
      res.json(users); 
    } catch (err) {
      res.status(500).json({error:err.message});
    }
})


module.exports = app;