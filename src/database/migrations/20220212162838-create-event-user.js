'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        typeof: Sequelize.INTEGER,
        allowNull: false,
      },
      event_id: {
        typeof: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('event_users', {
      fields: ['user_id', 'event_id'],
      type: 'unique',
      name: 'userId_eventId_eventUsers_unique'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('event_users');
  }
};