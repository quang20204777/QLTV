'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Books, Places, Card}) {
      this.hasOne(Card, {foreignKey: 'userId', as: 'userIdCard'});
      this.hasOne(Places, {foreignKey: 'userId', as: 'userIdPlace'});
      this.hasMany(Books, {foreignKey:'userId', as:'userIdBook'});
    }
  }
  Users.init({
    name: DataTypes.STRING,
    mssv: {
      type: DataTypes.STRING,
      allowNull: false,           //đánh dấu mssv không được rỗng
        unique: true,               //mssv là duy nhất
        validate: {
          len: [8, 8],              //chiều dài là 8 ký tự
        }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        len: [10,11],
        isNumeric: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6,100],
      }
    },
    userType: DataTypes.STRING,
    //isDelete bằng 0 tức là bản ghi vẫn tồn tại, khi xóa bản ghi sẽ không xóa hẳn mà update isDelete lên thành 1
    isDelete: {
      type: DataTypes.INTEGER
    } 
    //userType có 3 kiểu là user, userOtherSchool và admin
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};