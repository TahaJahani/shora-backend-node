'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Demand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Demand.init({
    user_id: sequelize.INTEGER,
    status: sequelize.ENUM,
    body: sequelize.STRING(500),
    category_id: sequelize.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    tableName: 'demands',
    modelName: 'Demand',
  });
  return Demand;
};