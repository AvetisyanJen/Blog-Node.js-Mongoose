const express = require('express');
const  {
    createBlogPost,
    getBlogPosts, 
    deleteBlogPost, 
    updateBlogPost,
    getAllBlogPostsAndComments,
    getBlogPostWithComments
} = require('../controllers/blogPostController');
const { AuthenticateUserToken } = require('../middleware/auth-user');
const post_router = express.Router();
const { CheckBlogPostOwnership}=require('../middleware/UserOwns')



post_router.post("/create",  AuthenticateUserToken,createBlogPost)
post_router.get("/blogPosts", getBlogPosts)
post_router.delete("/delete/:postId", AuthenticateUserToken, CheckBlogPostOwnership,deleteBlogPost)
post_router.put("/update/:postId", AuthenticateUserToken,CheckBlogPostOwnership,updateBlogPost)
post_router.get("/:postId", getBlogPostWithComments)
post_router.get("/all",getAllBlogPostsAndComments)


module.exports=post_router