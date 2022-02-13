'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      finish_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fee: {
        type: Sequelize.BIGINT.UNSIGNED,
      },
      gift: {
        type: Sequelize.BIGINT.UNSIGNED,
      },
      description: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};