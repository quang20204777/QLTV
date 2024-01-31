'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      mssv: {
        type: Sequelize.STRING,
        allowNull: false,           //đánh dấu mssv không được rỗng
        unique: true,               //mssv là duy nhất
        validate: {
          len: [8, 8],              //chiều dài là 8 ký tự
        }
      },
      phoneNumber: {
        type: Sequelize.STRING,
        validate: {
          len: [10, 11],
          isNumeric: true,
        }
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          len: [6,100],
        }
      },
      userType: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isDelete: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};