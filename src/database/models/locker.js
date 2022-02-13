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
    letter: sequelize.STRING(2),
    number: sequelize.INTEGER.UNSIGNED,
  }, {
    sequelize,
    modelName: 'Locker',
  });
  return Locker;
};