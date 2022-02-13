'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Locker.init({
    letter: DataTypes.STRING(2),
    number: DataTypes.INTEGER.UNSIGNED,
  }, {
    sequelize,
    tableName: 'lockers',
    modelName: 'Locker',
    timestamps: false,
  });
  return Locker;
};