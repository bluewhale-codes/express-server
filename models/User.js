// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple docs to omit this field (important!)
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },

  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters'],
    maxlength: [100, 'Full name must be less than 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    match: [
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain at least 8 characters, including uppercase, lowercase, number and special character',
   ],
   required: function () {
    return this.provider === 'local'; // ✅ only required for manual signup
  },
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // exclude password from query results by default
  },
  phone: {
    type: String,
    trim: true,
    sparse: true,
    match: [/^\+?\d{10,15}$/, 'Please enter a valid phone number'],
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});



userSchema.pre('save',async function (next){
   if(!this.isModified('password')) return next();

   const salt = await bcrypt.genSalt(12);
   this.password = await bcrypt.hash(this.password,salt);
   next();
});


module.exports = mongoose.model('User', userSchema);
