module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            foreignKey: true,
            references: {
                key: 'id',
                model: 'blog_posts',
            },
        },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            foreignKey: true,
            references: {
                key: 'id',
                model: 'categories',
            },
        },
    },
    {
        timestamps: false,
        underscored: true,
        tableName: 'posts_categories',
    });

    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, { 
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId',
            as: 'categories',
        });

        models.Category.belongsToMany(models.BlogPost, {
            through: PostCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId',
            as: 'blog_posts',
        });
    };

    return PostCategory;
};
