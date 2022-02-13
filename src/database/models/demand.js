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
    user_id: DataTypes.INTEGER,
    status: DataTypes.ENUM("pending", "accepted", "rejected"),
    body: DataTypes.STRING(500),
    category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    tableName: 'demands',
    modelName: 'Demand',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return Demand;
};