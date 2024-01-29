const BlogPost = require('./models/blogPosts');



// Middleware to check if the user owns the blog post



async function CheckBlogPostOwnership(req, res, next) {
    try {
        const blogPost = await BlogPost.findById(req.params.postId);

        if (!blogPost) {
            return res.status(404).json({ error: "Blog post not found" });
        }

        // Check if the authenticated user is the author of the blog post
        if (blogPost.author.toString() !== req.user.id) {
            return res.status(403).json({ error: "Forbidden: You are not the owner of this blog post" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports={
    CheckBlogPostOwnership
}