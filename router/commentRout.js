const express = require('express');
const  {
    createComment,
    deleteComment, 
 
} = require('../controllers/commentController');
const { AuthenticateUserToken } = require('../middleware/auth-user');
const comment_router = express.Router();
const { CheckBlogPostOwnership}=require('../middleware/UserOwns')



comment_router.post("/create",AuthenticateUserToken,createComment)

comment_router.delete("/delete/:blogPostId/:commentId",AuthenticateUserToken,CheckBlogPostOwnership,deleteComment)





module.exports=comment_router