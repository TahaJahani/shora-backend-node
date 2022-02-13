'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    name: DataTypes.STRING,
    start_at: DataTypes.DATE,
    finish_at: DataTypes.DATE,
    fee: DataTypes.BIGINT.UNSIGNED,
    gift: DataTypes.BIGINT.UNSIGNED,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    tableName: 'events',
    modelName: 'Event',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Event;
};