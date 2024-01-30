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
## Database Design
***
The application uses MongoDB as its database, and Mongoose is employed for data modeling.
The schema includes collections for users, blog posts, and comments, ensuring efficient and scalable data storage.
## API Endpoints
### User Management
 - `POST /api/user/register`: Register a new user.
 - `POST /api/user/login`: Log in an existing user.
 - `POST /api/user/logout`: Log out the currently authenticated user.
 - `GET  /api/user/profile`: Get the details of the currently authenticated user.
### Blog Post Management
 - `POST /api/post/create`:  Create a new blog post.
 - `GET /api/post/blogPosts`: Get a list of all blog posts.
 - `DELETE /api/post/delete/:postId`: Delete a specific blog post (only by the author).
 - `PUT  /api/post/update/:postId`: Update a specific blog post (only by the author).
### Comment Management
 - `POST /api/comment/create`: : Add a comment to a specific blog post.
 - `GET /api/comment/all`: Get all blogs and comments.
 - `DELETE /api/comment/:blogPoostId/:commentId`: Delete a specific comment on a blog post (only by the comment author).
 - `Get  /api/comment/delete/:postId`: Get all comments for a specific blog post.
***
## Setup Instructions
 1. Clone the repository.
 2. Install dependencies using npm install.
 3. Create a .env file in the root of your project.
 4. Define the following variables in the .env file:
    ```
    DB_URI=yourMongoDBConnectionURI  # Replace with your MongoDB connection URI
    PORT=3000 # Replace with your desired port number
    SECRET=yourSecretKey  # Replace with a strong and unique secret key

    ```
5. Run the application using `nodemon index.js`.
6. Explore the API endpoints using a tool like Postman.
