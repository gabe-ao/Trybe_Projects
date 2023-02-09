module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
        postId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: 'post_id',
            references: {
                model: 'blog_posts',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        categoryId: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: 'category_id',
            references: {
                model: 'categories',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    });
  },

  down: async (queryInterface, _Sequelize) => {
   await queryInterface.dropTable('posts_categories');
  }
};
