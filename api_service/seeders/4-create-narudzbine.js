'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Narudzbinas',[
      {
        vreme_narucivanja: new Date(),
        zakazano_vreme: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        status: 'Novo',
        adresa: 'Njegoseva 25, Beograd',
        telefon: '064 4444 444',
        ime_prezime: 'Marko Markovic',
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Narudzbinas', null, {});
  }
};
