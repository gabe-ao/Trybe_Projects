const { blogPostSchema, newUserSchema } = require('./schemas');
const { User, Category, BlogPost } = require('../../models');

const validateNewUser = async (displayName, email, password, image) => {
    const { error } = newUserSchema.validate({ displayName, email, password, image });
    if (error) return { type: 'INVALID_VALUE', message: error.message };

    const isUserAlreadyRegistered = await User.findOne({
        where: { email },
    });
    if (isUserAlreadyRegistered) {
        return { type: 'USER_ALREADY_REGISTERED', message: 'User already registered' };
    }

    return { type: null, message: 'Ok, new user valid' };
};

const validateNewBlogPost = async (title, content, categoryIds) => {
    const { error } = blogPostSchema.validate({ title, content, categoryIds });
    if (error) return { type: 'INVALID_VALUE', message: error.message };

    const categoriesFound = await Category.findAll({
        where: { id: categoryIds },
    });
    if (categoriesFound.length !== categoryIds.length) {
        return { type: 'CATEGORY_NOT_FOUND', message: '"categoryIds" not found' };
    }
    
    return { type: null, message: 'Ok, new blog post valid' };
};

const validateUpdateBlogPost = async (title, content, id, userId) => {
    const { error } = blogPostSchema.validate({ title, content, categoryIds: [0] });
    if (error) return { type: 'INVALID_VALUE', message: error.message };

    const doesPostExist = await BlogPost.findOne({ where: { id } });
    if (!doesPostExist) return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };

    if (doesPostExist.userId !== userId) {
        return { type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };
    }
    return { type: null, message: 'Ok, update data is valid' };
};

const validateDeleteBlogPost = async (id, userId) => {
    const doesPostExist = await BlogPost.findOne({ where: { id } });
    if (!doesPostExist) return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };

    if (doesPostExist.userId !== userId) {
        return { type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };
    }
    return { type: null, message: 'Ok, delete is valid' };
};

module.exports = {
    validateNewUser,
    validateNewBlogPost,
    validateUpdateBlogPost,
    validateDeleteBlogPost,
};
