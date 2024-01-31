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
    await queryInterface.bulkInsert('Users', [
      {
        name: "Nguyễn Công Lập",
        mssv: "20202412",
        phoneNumber: "0325847985",
        email: "lapbk@gmail.com",
        password: "$2a$10$Hv0NRxhpIrjtUEkWW0483e9TYsdJSr.t.paM1F9XFOtwdnMPawAhe",
        userType: "userOtherSchool",
        updatedAt: "2022-11-10 17:52:34",
        createdAt: "2022-11-10 17:52:34",
        isDelete: 0
      },
      {
        name: "Trịnh Hoàng Quân",
        mssv: "20204850",
        phoneNumber: "0325314123",
        email: "quanbk@gmail.com",
        password: "$2a$10$dDUVt3GC.S.lXZd7MdbZ/ulVjLdy2rk6Q9aWP.L3wZ8/YecMio/8.",
        userType: "userOtherSchool",
        updatedAt: "2022-11-10 17:52:34",
        createdAt: "2022-11-10 17:52:34",
        isDelete: 0
      },
      {
        name: "Trần Thanh Quang",
        mssv: "20204856",
        phoneNumber: "0325314134",
        email: "quangbk@gmail.com",
        password: "$2a$10$fxyoEBs6UIUgodVve0qoYO3TuSTPLO4pPcwF0dOVZMhuZYwl0k86G",
        userType: "userOtherSchool",
        updatedAt: "2022-11-10 17:52:34",
        createdAt: "2022-11-10 17:52:34",
        isDelete: 0
      },
      {
        name: "Nguyễn Bá Tư",
        mssv: "20004325",
        phoneNumber: "0325332544",
        email: "tubk@gmail.com",
        password: "$2a$10$EpZtNlkaOCMnaivxaYAvYugSm7BwHxDszAyPEONGzdDzb/td.ydBS",
        userType: "admin",
        updatedAt: "2022-11-10 17:52:34",
        createdAt: "2022-11-10 17:52:34",
        isDelete: 0
      },
      {
        name: "Nguyễn Hải long",
        mssv: "20183244",
        phoneNumber: "0432765324",
        email: "longbk@gmail.com",
        password: "$2a$10$ZNUf0GRJFoasb7KAbmyfV..z12ZGiHSJgVQ.SByQwOefGjka6HzNG",
        userType: "user",
        updatedAt: "2022-11-10 17:52:34",
        createdAt: "2022-11-10 17:52:34",
        isDelete: 0
      },
      {
        name: "Nguyễn Văn Hải",
        mssv: "20195634",
        phoneNumber: "0432742374",
        email: "haibk@gmail.com",
        password: "$2a$10$kVpC7YZYKBulNjo6scqgEus5JbQuHLCOcuA6e2H439czq99Gu6OfS",
        userType: "user",
        updatedAt: "2022-11-10 17:52:34",
        createdAt: "2022-11-10 17:52:34",
        isDelete: 0
      },
      {
        name: "Nguyễn viết hưng",
        mssv: "20202414",
        phoneNumber: "0926969925",
        email: "hungmgs@gmail.com",
        password: "$2a$10$vhSyMTWqdv0w1DKH1tqecuCS21FMHBta9ZrRwN.ITGhZB8yzo9yAm",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Nguyễn viết hải",
        mssv: "20205555",
        phoneNumber: "0926985624",
        email: "quanbkk65@gmail.com",
        password: "$2a$10$NvZKV.PFQ4ktZkwlslebaOHg1GlR66AKAvCwknVoI6gd.yyzYo53K",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Đỗ Hải Đăng",
        mssv: "20164832",
        phoneNumber: "0589632485",
        email: "dangkts@gmail.com",
        password: "$2a$10$JACeHjTemKTqXKo6PM5s/uKVvPJ00NCFwAA9eCXPinGj81chgKRca",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Nguyễn Trường Giang",
        mssv: "20176325",
        phoneNumber: "0123458697",
        email: "giangmtns@gmail.com",
        password: "$2a$10$G3LHciv73g9rDq57MB004uRy4iEl8G77fdopG.2XRaOwTPOU9s6tG",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Ngô Công Dũng",
        mssv: "20195874",
        phoneNumber: "0589632485",
        email: "dungnc@gmail.com",
        password: "$2a$10$CPh77huWjobHR.DNtecOVebg4ZunhqjyZ7O3nQO2rUrKWVfS7fYxa",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Tô Ký An",
        mssv: "20215896",
        phoneNumber: "0987523641",
        email: "anmt@gmail.com",
        password: "$2a$10$JACeHjTemKTqXKo6PM5s/uKVvPJ00NCFwAA9eCXPinGj81chgKRca",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Đề Văn Đóm",
        mssv: "20201587",
        phoneNumber: "0658324598",
        email: "dommts@gmail.com",
        password: "$2a$10$6eUzbB1ZzTwCksnceXp9suJ8zgQhHdMX37t..xOPqxGIZ9kd3AR7O",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Lô Hải Hường",
        mssv: "20213584",
        phoneNumber: "0936258745",
        email: "huongmgs@gmail.com",
        password: "$2a$10$DuvH3KKYtEh6rZGrhPL3Beihak9iVJurwtLW3pMNdyZsgNYGC13QW",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Dương Vân Anh",
        mssv: "20218752",
        phoneNumber: "0325865478",
        email: "vananh21@gmail.com",
        password: "$2a$10$oqne1sWTSx5jing3kFYi/.6zSaNQgcIJ0Pq9jWxe2STMALdpQp.oS",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Lã Thị Hồng Ánh",
        mssv: "20175846",
        phoneNumber: "0125486324",
        email: "honganh124@gmail.com",
        password: "$2a$10$WVDsrSOqbwqHMB5.Fc3LuefYHkiLxe1tZidOpnaYd7NW8nbgKYYB2",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Nguyễn Diệp Anh",
        mssv: "20195326",
        phoneNumber: "0547823165",
        email: "diepanhlm@gmail.com",
        password: "$2a$10$P0rP32MgP5nANTNAkoLLue1Ua3aF4Rm7HN27zpseIc.QfSSm6c4vy",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Tô Xuân Mạnh",
        mssv: "20185472",
        phoneNumber: "0758654895",
        email: "manhtoch@gmail.com",
        password: "$2a$10$KlRen4Cj27xCtFXWrJ2ilO8nxRRTY2G5R/8QtFAgWsuzFVXgl.X7C",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Tô Diệp Tử",
        mssv: "20135426",
        phoneNumber: "0625486325",
        email: "tumggs@gmail.com",
        password: "$2a$10$GY8.uQoc5DtdxwGkpqSYV.BoA7Popy6jcR3.pbOXEb3pVQPwVgRR6",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Lâm Văn Hạnh",
        mssv: "20201586",
        phoneNumber: "0988888878",
        email: "hanhmgs@gmail.com",
        password: "$2a$10$RWOAv.TivXuYIXxJDLbnR.8VJ1lwGnjMhp0ggtImkccjSivbQ4ZEC",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Nguyễn Diếp Văn",
        mssv: "20201521",
        phoneNumber: "0325461258",
        email: "vanmlg@gmail.com",
        password: "$2a$10$NKm.Gb1cal/gbDVXW2.HrecIbIhCML1StQBHYPo.8vF4XyKuHhCHq",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Trịnh Công Sơn",
        mssv: "20172536",
        phoneNumber: "0512356487",
        email: "songdgsd@gmail.com",
        password: "$2a$10$79pyeAKCJ0RycKCNBGuZ6.OnDbd.eIAqh6U03bRk7Sx.sYVH0ZdOu",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Mai Tiến Dũng",
        mssv: "20162354",
        phoneNumber: "0584236512",
        email: "dungmt@gmail.com",
        password: "$2a$10$1YcyIdxaxPGInVsxl/rJWuHFlldgCafHnv.PAgujONBQ3GG349TRW",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },
      {
        name: "Chu Minh Huệ",
        mssv: "20215326",
        phoneNumber: "0585326548",
        email: "huemt@gmail.com",
        password: "$2a$10$1YcyIdxaxPGInVsxl/rJWuHFlldgCafHnv.PAgujONBQ3GG349TRW",
        userType: "user",
        updatedAt: "2023-01-17 15:55:09",
        createdAt: "2023-01-13 00:22:25",
        isDelete: 0
      },

      //password: abcd1234
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
