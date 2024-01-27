const express = require('express');
const  {createBlogPost,getBlogPosts} = require('../controllers/blogPostController');
const { AuthenticateUserToken } = require('../jwt/auth-user');
const post_router = express.Router();




post_router.post("/create",  AuthenticateUserToken,createBlogPost)
post_router.get("/blogPosts", getBlogPosts)



module.exports=post_router