'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Narudzbinas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vreme_narucivanja: {
        type: Sequelize.DATE
      },
      zakazano_vreme: {
        type: Sequelize.DATE
      },
      vreme_narucivanja: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      adresa: {
        type: Sequelize.TEXT
      },
      telefon: {
        type: Sequelize.TEXT
      },
      ime_prezime: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Narudzbinas');
  }
};