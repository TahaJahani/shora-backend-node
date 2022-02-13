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
    name: sequelize.STRING,
    found_in: sequelize.STRING,
    found_at: sequelize.DATE,
    returned_at: sequelize.DATE
  }, {
    sequelize,
    paranoid: true,
    tableName: 'lost_and_founds',
    modelName: 'LostAndFound',
  });
  return LostAndFound;
};