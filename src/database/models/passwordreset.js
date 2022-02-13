'use strict';
const {
  Model
} = require('sequelize');
const { gt } = require('sequelize/lib/operators');
module.exports = (sequelize, DataTypes) => {
  class PasswordReset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PasswordReset.init({
    user_id: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    used: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
  }, {
    defaultScope: {
      where: {
        created_at: {$gt: new Date().setMinutes(new Date().getMinutes() - 20)},
        used: 0,
      },
    },
    sequelize,
    tableName: 'password_resets',
    modelName: 'PasswordReset',
    timestamps: false,
  });
  return PasswordReset;
};