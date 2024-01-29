const Comment = require('../models/comments');
const BlogPost = require('../models/blogPosts');

// Create a new comment
const createComment = async (req, res) => {
    try {
        const { text, user, blogPostId } = req.body;
console.log(user)
        // Validate if the blog post exists
        const blogPost = await BlogPost.findById(blogPostId);
        console.log(blogPost,user)
        if (!blogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        const newComment = new Comment({
            text,
            user: req.user.id
        });

        const savedComment = await newComment.save();

     
        blogPost.comments.push(savedComment._id);
        await blogPost.save();

        res.status(201).json(savedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const { commentId, blogPostId } = req.params;


        const blogPost = await BlogPost.findById(blogPostId);
        if (!blogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        
        const commentIndex = blogPost.comments.indexOf(commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ error: 'Comment not found' });
        }

    
        blogPost.comments.splice(commentIndex, 1);
        await blogPost.save();

     
        await Comment.findByIdAndDelete(commentId);

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createComment,
    deleteComment
};
