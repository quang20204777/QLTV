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
    await queryInterface.bulkInsert('Places', [
      {
        positionPlace: '23D',
        userId:'1',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12'
      },
      {
        positionPlace: '1E',
        userId:'2',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12'
      },
      {
        positionPlace: '1C',
        userId: null,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12'
      },
      {
        positionPlace: '2B',
        userId: null,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12'
      },
      {
        positionPlace: '3B',
        userId: null,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Places', null, {});
  }
};
