const BlogPost = require('../models/blogPosts');



async function CheckBlogPostOwnership(req, res, next) {
    try {
        const blogPost = await BlogPost.findById(req.params.postId);

        if (!blogPost) {
            return res.status(404).json({ error: "Blog post not found" });
        }

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