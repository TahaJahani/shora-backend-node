'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    amount: DataTypes.BIGINT.UNSIGNED,
    description: DataTypes.STRING,
    type: DataTypes.ENUM("withdraw", "deposit"),
    at: DataTypes.DATE,
  }, {
    sequelize,
    paranoid: true,
    tableName: 'transactions',
    modelName: 'Transaction',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return Transaction;
};