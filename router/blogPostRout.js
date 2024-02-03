const express = require('express');
const {
    createBlogPost,
    getBlogPosts,
    deleteBlogPost,
    updateBlogPost,
    getAllBlogPostsAndComments,
    getBlogPostWithComments
} = require('../controllers/blogPostController');
const { AuthenticateUserToken } = require('../middleware/auth-user');
const { CheckBlogPostOwnership } = require('../middleware/UserOwns');

const post_router = express.Router();

post_router.post("/create", AuthenticateUserToken, createBlogPost);
post_router.get("/blogPosts", getBlogPosts);
post_router.delete("/delete/:postId", AuthenticateUserToken, CheckBlogPostOwnership, deleteBlogPost);
post_router.put("/update/:postId", AuthenticateUserToken, CheckBlogPostOwnership, updateBlogPost);
post_router.get("/all", getAllBlogPostsAndComments);
post_router.get("/:postId", getBlogPostWithComments);

module.exports = post_router;

