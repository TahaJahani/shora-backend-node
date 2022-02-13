'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    student_number: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    is_banned: DataTypes.BOOLEAN,
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return User;
};