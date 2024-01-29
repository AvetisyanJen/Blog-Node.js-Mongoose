const BlogPost = require('../models/blogPosts');
const User=require("../models/users")
async function createBlogPost(req, res) {
    try {
        const { title, body } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized: User information not available." });
        }

        // Check if the user exists based on the provided user ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

   
        const newBlogPost = new BlogPost({
            title,
            body,
            author: user.id,
        });

       
        const savedBlogPost = await newBlogPost.save();

        res.status(201).json(savedBlogPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



async function getBlogPosts(req, res) {
    try {
        const blogPosts = await BlogPost.find().populate('author', 'userName');
        res.json(blogPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function deleteBlogPost(req,res){
    try {
        const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.postId);
        res.json({ message: "Blog post deleted successfully", deletedBlogPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateBlogPost(req, res){
    try {
        const {postId} = req.params;
        const updatedData = req.body; 
// console.log(req.params.id,updatedData)
// console.log(req.params)
       
        const existingPost = await BlogPost.findById(postId);

        if (!existingPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Update the existing post with the new data
        existingPost.title = updatedData.title || existingPost.title;
        existingPost.body = updatedData.body || existingPost.body;
    
        existingPost.updatedAt = new Date();

 
        await existingPost.save();
      

        return res.status(200).json({ message: 'Post updated successfully', post: existingPost });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};





module.exports = {
    createBlogPost,
    getBlogPosts,
    deleteBlogPost,
    updateBlogPost
};
