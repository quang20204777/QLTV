'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Cards', [
      {
        nameUser: 'Trịnh Hoàng Quân',
        school: 'Đại học Thương Mại',
        balance: 30000,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        userId: 2
      },
      {
        nameUser: 'Nguyễn Công Lập',
        school: 'Đại học Kinh Tế Quốc Dân',
        balance: 60000,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        userId: 1
      },
      {
        nameUser: 'Trần Thanh Quang',
        school: 'Đại học Bách Khoa Hà Nội',
        balance: 60000,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        userId: 3
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Cards', null, {});
  }
};
