'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rentable_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rentable_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount_paid: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      amount_returned: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },
      rented_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      returned_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      return_deadline: {
        type: Sequelize.DATE,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rents');
  }
};