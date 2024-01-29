const express = require('express');
const  {register,login} = require('../controllers/userController');
const user_router = express.Router();
const { registerValidationRules, loginValidationRules } = require('../validator');
const { AuthenticateUserToken } = require('../middleware/auth-user');
const logOutrouter = require('./logoutRouter');


user_router.post("/register",registerValidationRules,register)
user_router.post("/login",loginValidationRules,login)

user_router.use(AuthenticateUserToken);


user_router.get("/profile", (req, res) => {
  
    const user = req.user;
    res.json({ profile: user });
});


user_router.use(logOutrouter);

module.exports=user_router