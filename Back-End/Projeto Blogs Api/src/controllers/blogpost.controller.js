const blogPostService = require('../services/blogpost.service');
const { errorMapper } = require('../utils/errorMapper');

const postBlogPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { type, message } = await blogPostService.createBlogPost(
        title, content, categoryIds, req.userId,
    );
    if (type) return res.status(errorMapper(type)).json({ message });

    return res.status(201).json(message);
};

const getAllPosts = async (_req, res) => {
    try {
        const { message } = await blogPostService.selectAllBlogPosts();
        return res.status(200).json(message);
    } catch (error) {
        return res.status(errorMapper('INTERNAL_ERROR')).json({ message: 'Internal server error' });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, message } = await blogPostService.selectBlogPostById(id);
        if (type) return res.status(errorMapper(type)).json({ message });
        return res.status(200).json(message);
    } catch (error) {
        return res.status(errorMapper('INTERNAL_ERROR')).json({ message: 'Internal server error' });
    }
};

const putBlogPost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    
    const { type, message } = await blogPostService.updateBlogPostById(
        title, content, id, req.userId,
    );
    if (type) return res.status(errorMapper(type)).json({ message });
    
    return res.status(200).json(message);
};

const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, message } = await blogPostService.deleteBlogPost(id, req.userId);
        if (type) return res.status(errorMapper(type)).json({ message });
        
        return res.status(204).end();
    } catch (error) {
        return res.status(errorMapper('INTERNAL_ERROR')).json({ message: 'Internal server error' });
    }
};

module.exports = {
    postBlogPost,
    getAllPosts,
    getPostById,
    putBlogPost,
    deleteBlogPost,
};
