'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role.init({
    user_id: DataTypes.INTEGER,
    role: DataTypes.ENUM('owner', 'admin', 'financial', 'welfare','user'),
  }, {
    sequelize,
    tableName: 'roles',
    modelName: 'Role',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Role;
};