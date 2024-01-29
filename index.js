const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {port,dbURI} = require('./config');

app.use(express.json());

const user_router = require('./router/userRout');
const post_router=require("./router/blogPostRout");
const comment_router = require('./router/commentRout');

app.use("/user", user_router);
app.use("/post",post_router)
app.use("/comment",comment_router)
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });