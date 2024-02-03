// const BlogPost = require('../models/blogPosts');



// async function CheckBlogPostOwnership(req, res, next) {
//     try {
//         const blogPost = await BlogPost.findById(req.params.postId);

//         if (!blogPost) {
//             return res.status(404).json({ error: "Blog post not found" });
//         }

//         if (blogPost.author.toString() !== req.user.id) {
//             return res.status(403).json({ error: "Forbidden: You are not the owner of this blog post" });
//         }

//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }
// module.exports={
//     CheckBlogPostOwnership
// }
const BlogPost = require('../models/blogPosts');
const Comment = require('../models/comments'); // Import your Comment model if not already imported

async function CheckBlogPostOwnership(req, res, next) {
    try {
        const { postId, commentId } = req.params;

        const blogPost = await BlogPost.findById(postId);

        if (!blogPost) {
            return res.status(404).json({ error: "Blog post not found" });
        }

        // Check if the user is the author of the blog post
        if (blogPost.author.toString() !== req.user.id) {
            // If not, check if the user owns the comment
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return res.status(404).json({ error: 'not found' });
            }

            if (comment.user.toString() !== req.user.id) {
                return res.status(403).json({ error: 'Forbidden: You are not the owner of this blog post or comment' });
            }
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    CheckBlogPostOwnership
};
