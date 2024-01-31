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
    await queryInterface.bulkInsert('Books', [
      {
        name: 'Dế mèn phiêu lưu ký',
        author: 'Tô Hoài',
        title: 'Phiêu lưu',
        countPage: 195,
        year: 1941,
        positionBook: '32D',
        dayBorrow: '2022-12-17 04:33:12',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: '2023-03-17 04:33:12',
        userId: 1,
        urlImage: '1675440654788-715983700booksnewe1611252343470-1640339-6533-8077-1640339279.jpg',
      },
      {
        name: 'Vợ nhặt',
        author: 'Kim Lân',
        title: 'Truyện ngắn',
        countPage: 75,
        year: 1962,
        positionBook: '2C',
        dayBorrow: '2023-01-17 04:33:12',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: '2023-04-17 04:33:12',
        userId: 1,
        urlImage: '1676386604819-238008913368d77eb57d9a8ae2da5577074d328a5.jpg',
      },
      {
        name: 'Đắc nhân tâm',
        author: 'Dale Carnegie',
        title: 'Tự giúp bản thân',
        countPage: 291,
        year: 1936,
        positionBook: '15G',
        dayBorrow: '2022-12-01 04:33:12',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'1',
        endDate: '2023-03-01 04:33:12',
        userId: 2,
        urlImage: '1676208124523-433792148doi-ngan-dung-ngu-dai.jpg',
      },
      {
        name: 'Sherlock holmes',
        author: 'Conan Doyle',
        title: 'Trinh thám',
        countPage: 2300,
        year: 1876,
        positionBook: '3T',
        dayBorrow: '2022-01-08 04:33:12',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: '2022-04-08 04:33:12',
        userId: 2,
        urlImage: '1676386638251-603230508sach-than-so-hoc.jpg',
      },
      {
        name: 'Sherlock holmes',
        author: 'Conan Doyle',
        title: 'Trinh thám',
        countPage: 2300,
        year: 1876,
        positionBook: '3T',
        dayBorrow: null,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: '2023-02-17 04:33:12',
        userId: null,
        urlImage: '1676773594935-95463220images(1).jpg',
      },
      {
        name: 'Sherlock holmes',
        author: 'Conan Doyle',
        title: 'Trinh thám',
        countPage: 2300,
        year: 1876,
        positionBook: '3T',
        dayBorrow: '2023-01-17 04:33:12',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: '2023-04-17 04:33:12',
        userId: null,
        urlImage: '1676773603262-2922878images(2).jpg',
      },
      {
        name: 'Dragonball tập 1',
        author: 'Toriyama Akira',
        title: 'Võ thuật',
        countPage: 167,
        year: 1923,
        positionBook: '4T',
        dayBorrow: '2023-01-17 04:33:12',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: '2023-04-17 04:33:12',
        userId: 2,
        urlImage: '1676773609127-781673409images(3).jpg',
      },
      {
        name: 'Dragonball tập 2',
        author: 'Toriyama Akira',
        title: 'Võ thuật',
        countPage: 159,
        year: 1923,
        positionBook: '5T',
        dayBorrow: null,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: null,
        userId:null,
        urlImage: '1676386647379-817654570review-sach-dung-bao-gio-tu-bo-giac-mo-revisach.com_.jpg',
      },
      {
        name: 'Dragonball tập 3',
        author: 'Toriyama Akira',
        title: 'Võ thuật',
        countPage: 163,
        year: 1923,
        positionBook: '6T',
        dayBorrow: null,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: null,
        userId: null,
        urlImage: '1676773614369-73509437images(4).jpg',
      },
      {
        name: 'Conan tập 1',
        author: 'Aoyama Gōshō',
        title: 'Trinh thám',
        countPage: 213,
        year: 1994,
        positionBook: '2G',
        dayBorrow: null,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: null,
        userId: null,
        urlImage: '1676208124523-433792148doi-ngan-dung-ngu-dai.jpg',
      },
      {
        name: 'Conan tập 2',
        author: 'Aoyama Gōshō',
        title: 'Trinh thám',
        countPage: 210,
        year: 1994,
        positionBook: '5G',
        dayBorrow: '2023-01-17 04:33:12',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: '2023-04-17 04:33:12',
        userId: 2,
        urlImage: '1676773621846-570183789images.jpg',
      },
      {
        name: 'Conan tập 12',
        author: 'Aoyama Gōshō',
        title: 'Trinh thám',
        countPage: 200,
        year: 1994,
        positionBook: '12F',
        dayBorrow: '2022-11-17 04:33:12',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: '2023-02-17 04:33:12',
        userId: 3,
        urlImage: '1676773627056-422188870images.png',
      },
      {
        name: 'Conan tập 12',
        author: 'Aoyama Gōshō',
        title: 'Trinh thám',
        countPage: 200,
        year: 1994,
        positionBook: '12F',
        dayBorrow: '2022-11-17 04:33:12',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: '2023-02-17 04:33:12',
        userId: 5,
        urlImage: '1676773639333-192562556sach-1_19520222249.png',
      },
      {
        name: 'Những kẻ khốn khổ',
        author: 'Victor Hugo',
        title: 'Tiểu thuyết',
        countPage: 5243,
        year: 1862,
        positionBook: '1B',
        dayBorrow: null,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: null,
        userId: null,
        urlImage: '1676773644900-460014481sach-hay-tran-trong-chinh-minh.jpg',
      },
      {
        name: 'Những kẻ khốn khổ',
        author: 'Victor Hugo',
        title: 'Tiểu thuyết',
        countPage: 5243,
        year: 1862,
        positionBook: '1B',
        dayBorrow: '2022-02-17 04:33:12',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: '2022-05-17 04:33:12',
        userId: 5,
        urlImage: '1675440654788-715983700booksnewe1611252343470-1640339-6533-8077-1640339279.jpg',
      },
      {
        name: 'Cuộc đi săn của bầy cừu',
        author: 'Victor Hugo',
        title: 'Tiểu thuyết',
        countPage: 523,
        year: 1987,
        positionBook: '12G',
        dayBorrow: null,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: null,
        userId: null,
        urlImage: '1676773649739-794688292sach-ta-ba-lo-tren-dat-a.jpg',
      },
      {
        name: 'Những chú chim biển',
        author: 'Yashen',
        title: 'Tiểu thuyết',
        countPage: 983,
        year: 2001,
        positionBook: '17G',
        dayBorrow: null,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: null,
        userId: null,
        urlImage: '1675440654788-715983700booksnewe1611252343470-1640339-6533-8077-1640339279.jpg',
      },
      {
        name: 'Ánh Sao và Bầu trời',
        author: 'Huy Nam',
        title: 'Tiểu thuyết',
        countPage: 125,
        year: 2008,
        positionBook: '22G',
        dayBorrow: '2022-12-17 04:33:12',
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'8',
        endDate: '2022-03-17 04:33:12',
        userId: null,
        urlImage: '1676773655256-79305609toi-tai-gioi-ban-cung-the-adam-khoo-514429.jpg',
      },
      {
        name: 'Em và Tôi',
        author: 'Cù Văn Hậu',
        title: 'Phiêu lưu',
        countPage: 1251,
        year: 1992,
        positionBook: '3T',
        dayBorrow: null,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: null,
        userId: null,
        urlImage: '1676386647379-817654570review-sach-dung-bao-gio-tu-bo-giac-mo-revisach.com_.jpg',
      },
      {
        name: 'Tâm Lý Học - Phác Họa Chân Dung Kẻ Phạm Tội',
        author: 'Diệp Hồng Vũ',
        title: 'Trinh thám',
        countPage: 422,
        year: 2020,
        positionBook: '8K',
        dayBorrow: null,
        createdAt: '2022-01-17 04:33:12',
        updatedAt: '2022-01-17 04:33:12',
        status:'0',
        endDate: null,
        userId: null,
        urlImage: '1676386647379-817654570review-sach-dung-bao-gio-tu-bo-giac-mo-revisach.com_.jpg',
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
     await queryInterface.bulkDelete('Books', null, {});
  }
};
