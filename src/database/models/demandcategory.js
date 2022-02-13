'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DemandCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DemandCategory.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    tableName: 'demand_categories',
    modelName: 'DemandCategory',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return DemandCategory;
};