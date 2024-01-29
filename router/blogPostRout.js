const express = require('express');
const  {createBlogPost,getBlogPosts, deleteBlogPost} = require('../controllers/blogPostController');
const { AuthenticateUserToken } = require('../jwt/auth-user');
const post_router = express.Router();
const { CheckBlogPostOwnership}=require('../middlewareUserOwns')



post_router.post("/create",  AuthenticateUserToken,createBlogPost)
post_router.get("/blogPosts", getBlogPosts)
post_router.delete("/delete/:postId", AuthenticateUserToken, CheckBlogPostOwnership,deleteBlogPost)



module.exports=post_router