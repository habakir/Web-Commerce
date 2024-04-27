'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Kolekcijas',[
    {
      id: 1,
      naziv:"Majica",
      opis:"Oversized",
      cena: 3000,
      Kategorija_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      naziv:"Duks",
      opis:"Oversized",
      cena: 4000,
      Kategorija_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kolekcijas', null, {});
  }
};
