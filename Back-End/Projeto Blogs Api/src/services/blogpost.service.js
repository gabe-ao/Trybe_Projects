const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, PostCategory, Category, User } = require('../models');
const { validateNewBlogPost,
    validateUpdateBlogPost, 
    validateDeleteBlogPost } = require('./validations/validationsInputValues');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createBlogPost = async (title, content, categoriesIds, userId) => {
    const { type, message } = await validateNewBlogPost(title, content, categoriesIds);
    if (type) return { type, message };
    try {
        const newPost = await sequelize.transaction(async (t) => {
            const post = await BlogPost.create(
                { title, content, userId },
                { transaction: t },
            );
    
            const postCategoriesEntries = categoriesIds.map((id) => 
                ({ postId: post.id, categoryId: id }));
    
            await PostCategory.bulkCreate(postCategoriesEntries, { transaction: t });
            return post;
        });

        return { type: null, message: newPost };
    } catch (error) {
        return { type: 'INTERNAL_ERROR', message: 'Internal Server Error' };
    }
};

const selectAllBlogPosts = async () => {
    const allPosts = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    return { type: null, message: allPosts };
};

const selectBlogPostById = async (id) => {
    const post = await BlogPost.findOne({
        where: { id },
        include: [
            { model: User, as: 'user', attributes: { exclude: 'password' } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    if (!post) return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };

    return { type: null, message: post };
};

const updateBlogPostById = async (title, content, id, userId) => {
    const { type, message } = await validateUpdateBlogPost(title, content, id, userId);
    if (type) return { type, message };

    const updatedPost = await sequelize.transaction(async (t) => {
        await BlogPost.update(
            { title, content, updated: Sequelize.literal('CURRENT_TIMESTAMP') },
            { where: { id }, transaction: t },
        );

        const post = await BlogPost.findOne({
            where: { id },
            include: [
                { model: User, as: 'user', attributes: { exclude: 'password' } },
                { model: Category, as: 'categories', through: { attributes: [] } },
            ],
            transaction: t,
        });
        return post;
    });

    return { type: null, message: updatedPost };
};

const deleteBlogPost = async (id, userId) => {
    const { type, message } = await validateDeleteBlogPost(id, userId);
    if (type) return { type, message };

    await BlogPost.destroy({
        where: { id, userId },
    });
    return { type: null, message: 'Ok, post deleted successfully' };
};

module.exports = {
    createBlogPost,
    selectAllBlogPosts,
    selectBlogPostById,
    updateBlogPostById,
    deleteBlogPost,
};
