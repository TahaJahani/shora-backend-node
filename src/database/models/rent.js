'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rent.init({
    rentable_type: sequelize.STRING,
    rentable_id: sequelize.INTEGER,
    user_id: sequelize.INTEGER,
    amount_paid: sequelize.BIGINT.UNSIGNED,
    amount_returned: sequelize.BIGINT.UNSIGNED,
    rented_at: sequelize.DATE,
    returned_at: sequelize.DATE,
    return_deadline: sequelize.DATE,
  }, {
    sequelize,
    tableName: 'rents',
    modelName: 'Rent',
  });
  return Rent;
};