'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Places extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      this.belongsTo(Users, {foreignKey: 'userId', as: 'userIdPlace'});
    }
  }
  Places.init({
    positionPlace: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Places',
  });
  return Places;
};