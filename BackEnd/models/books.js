'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      this.belongsTo(Users, {foreignKey:'userId', as:'userIdBook'});
    }
  }
  Books.init({
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    countPage: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    positionBook: DataTypes.STRING,
    dayBorrow: DataTypes.DATE,
    //status cho biết sách đã bị xóa hay chưa, active là 0 deleted là 1
    status: DataTypes.STRING,
    endDate: DataTypes.DATE,
    //ảnh của quyển sách
    urlImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};