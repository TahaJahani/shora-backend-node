'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LostAndFound extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LostAndFound.init({
    name: DataTypes.STRING,
    found_in: DataTypes.STRING,
    found_at: DataTypes.DATE,
    returned_at: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    tableName: 'lost_and_founds',
    modelName: 'LostAndFound',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return LostAndFound;
};