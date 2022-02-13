'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      likeable_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      likeable_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('likes', {
      fields: ['user_id', 'likeable_id', 'likeable_type'],
      type: 'unique',
      name: 'userId_likeableId_likeableType_likes_unique'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('likes');
  }
};