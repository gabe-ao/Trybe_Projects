const express = require('express');
const blogPostController = require('../controllers/blogpost.controller');
const validateJWT = require('../middlewares/validateJWT');
const validateReqNewPost = require('../middlewares/validateReqNewPost');
const validateReqUpdatePost = require('../middlewares/validateReqUpdatePost');

const postRouter = express.Router();

postRouter.post('/', validateJWT, validateReqNewPost, blogPostController.postBlogPost);
postRouter.get('/', validateJWT, blogPostController.getAllPosts);
postRouter.get('/:id', validateJWT, blogPostController.getPostById);
postRouter.put('/:id', validateJWT, validateReqUpdatePost, blogPostController.putBlogPost);
postRouter.delete('/:id', validateJWT, blogPostController.deleteBlogPost);

module.exports = postRouter;