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




const deleteComment = async (req, res) => {
    try {
        console.log("Request Parameters:", req.params);

        const blogPost = await BlogPost.findById(req.params.postId);
        console.log("Blog Post:", blogPost);

        if (!blogPost) {
            console.log("Blog Post not found");
            return res.status(404).json({ error: 'Blog post not found' });
        }

        const commentIndex = blogPost.comments.indexOf(req.params.commentId);
        console.log("Comment Index:", commentIndex);

        if (commentIndex === -1) {
            console.log("Comment not found");
            return res.status(404).json({ error: 'Comment not found' });
        }

        blogPost.comments.splice(commentIndex, 1);
        await blogPost.save();

        await Comment.findByIdAndDelete(req.params.commentId);
        console.log("Comment deleted successfully");

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createComment,
    deleteComment
};
