'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventUser.init({
    user_id: sequelize.INTEGER,
    event_id: sequelize.INTEGER,
  }, {
    sequelize,
    tableName: 'event_users',
    modelName: 'EventUser',
  });
  return EventUser;
};