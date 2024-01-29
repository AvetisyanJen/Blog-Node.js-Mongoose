# Blog Platform
***
## Description
***
This project is a basic blog platform backend built with Express.js,MongoDB for the database, with Mongoose for data modeling.It provides a boilerplate for creating a simple blog backend with features
like user registration and authentication, post management, comment management.

## Features
***
1. User Registration and Authentication:
   - Users can register,login,logout with unique usernames and passwords using the express-validator
   - Passwords are securely hashed using bcrypt.
   - JWT (JSON Web Tokens) are used for authentication, ensuring secure access to protected routes.
2. Post Management:
   - Authenticated users can create new blog posts.
   - All users (authenticated or not) can read/view blog posts.
   - Authenticated users can update and delete their own blog posts.
   - Each post includes a title, content, author, and timestamp.
3. Comments:
   - Authenticated users can post comments on blog posts.
   - Users should be able to view all comments associated with a blog post.
   - Users can delete their own comments.
