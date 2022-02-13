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
    rentable_type: DataTypes.STRING,
    rentable_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    amount_paid: DataTypes.BIGINT.UNSIGNED,
    amount_returned: DataTypes.BIGINT.UNSIGNED,
    rented_at: DataTypes.DATE,
    returned_at: DataTypes.DATE,
    return_deadline: DataTypes.DATE,
  }, {
    sequelize,
    tableName: 'rents',
    modelName: 'Rent',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Rent;
};