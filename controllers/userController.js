const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const { validationResult } = require("express-validator");
const { generateAccessToken } = require('../jwt/generate');

async function register(req, res) {
   

    try {
        const { email, userName, password } = req.body;
        const errors = validationResult(req);
    console.log(req.body)
      
        
        if (!errors.isEmpty()) {
          const errorMessage = errors.array()[0].msg;
          return res.status(400).json({ error: errorMessage });
        }
  
         const existingUser = await User.findOne({ where: {email} });
        if (existingUser) {
          return res.status(409).json({ error: "A user with this email already exists." });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            userName,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError || error.code === 11000) {
            return res.status(400).json({ error: "Validation error or duplicate key error." });
        } else {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}


async function login(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide email and password." });
        }

   
        const user = await User.findOne({ email });

    
        if (!user) {
            return res.status(400).json({ error: "Email is not correct" });
        }


        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password" });
        }

    
        const token = generateAccessToken(user._id, user.email, user.userName);
        res.json({ status: "Logged in", user, jwt: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
  

module.exports = {
    register,login
};
