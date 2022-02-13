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
    name: sequelize.STRING,
    start_at: sequelize.DATE,
    finish_at: sequelize.DATE,
    fee: sequelize.BIGINT.UNSIGNED,
    gift: sequelize.BIGINT.UNSIGNED,
    description: sequelize.TEXT,
  }, {
    sequelize,
    tableName: 'events',
    modelName: 'Event',
  });
  return Event;
};