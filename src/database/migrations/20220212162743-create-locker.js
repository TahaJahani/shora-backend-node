'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lockers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      letter: {
        type: Sequelize.STRING(2),
      },
      number: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
    });
    await queryInterface.addConstraint('lockres', {
      fields: ['letter', 'number'],
      type: 'unique',
      name: 'letter_number_locker_unique'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lockers');
  }
};