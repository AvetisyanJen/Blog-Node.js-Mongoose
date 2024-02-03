const BlogPost = require('../models/blogPosts');
const Comment=require("../models/comments")
const User=require("../models/users")


async function createBlogPost(req, res) {
    try {
        const { title, body } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized: User information not available." });
        }

     
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



const getBlogPostWithComments = async (req, res) => {
    try {
        const postId = req.params.postId;

        // Find the blog post
        const blogPost = await BlogPost.findById(postId).populate('comments');

        if (!blogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        const comments = await Comment.find({ blogPost: postId });

        res.status(200).json({ blogPost, comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getAllBlogPostsAndComments = async (req, res) => {
    // try {
    
    //     const blogPosts = await BlogPost.find().populate('comments');
    //     console.log('Blog Posts:', blogPosts);
   
    //     const comments = await Comment.find();

    //     res.status(200).json({ blogPosts, comments });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
    try {
        // Populate the 'comments' field in the BlogPost model
        const blogPosts = await BlogPost.find().populate('comments').exec();

        res.json(blogPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};









module.exports = {
    createBlogPost,
    getBlogPosts,
    deleteBlogPost,
    getAllBlogPostsAndComments,
    getBlogPostWithComments,
    updateBlogPost
};
