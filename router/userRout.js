const express = require('express');
const  {register,login} = require('../controllers/userController');
const user_router = express.Router();
const { registerValidationRules, loginValidationRules } = require('../validator');
const { AuthenticateUserToken } = require('../middleware/auth-user');
const logOutrouter = require('./logoutRouter');


user_router.post("/register",registerValidationRules,register)
user_router.post("/login",loginValidationRules,login)

user_router.use(AuthenticateUserToken);

// Protected routes (require authentication)
user_router.get("/profile", (req, res) => {
    // Access the authenticated user information from req.user
    const user = req.user;
    res.json({ profile: user });
});

// Include other protected routes here...

// Include the logout router
user_router.use(logOutrouter);

module.exports=user_router