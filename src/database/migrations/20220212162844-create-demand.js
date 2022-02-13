'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('demands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["pending", "accepted", "rejected"],
        defaultValue: 'pending',
      },
      body: {
        type: Sequelize.STRING(500),
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('demands');
  }
};