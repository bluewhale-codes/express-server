const express = require('express');
const router = express.Router();
const {getAllUsers,createUser, loginUser,getUserDetails,getGoogleProfile} = require('../controlers/userControler');
const isAuthenticatedUser = require("../middleware/auth");

router.get("/admin",getAllUsers);


router.post("/createUser",createUser);
router.post("/login",loginUser);
router.get('/getProfile',getGoogleProfile);
router.get('/getUser',isAuthenticatedUser,getUserDetails)

module.exports = router;