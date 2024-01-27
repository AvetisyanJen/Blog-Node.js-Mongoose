const express = require('express');
const  {register,login} = require('../controllers/userController');
const user_router = express.Router();
const { registerValidationRules, loginValidationRules } = require('../validator');



user_router.post("/register",registerValidationRules,register)
user_router.post("/login",loginValidationRules,login)


module.exports=user_router