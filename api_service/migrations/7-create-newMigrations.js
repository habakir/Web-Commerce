'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Kolekcijas', {
      fields: ['Kategorija_id'],
      type: 'foreign key',
      references: {
        table:'Kolekcijas',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
    queryInterface.addConstraint('KolekcijaModels', {
      fields: ['Kolekcija_id'],
      type: 'foreign key',
      references: {
        table:'Kolekcijas',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
    queryInterface.addConstraint('KolekcijaModels', {
      fields: ['Materijal_id'],
      type: 'foreign key',
      references: {
        table:'Materijals',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
    queryInterface.addConstraint('StavkaNarudzbines', {
      fields: ['Kolekcija_id'],
      type: 'foreign key',
      references: {
        table:'Kolekcijas',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
    queryInterface.addConstraint('StavkaNarudzbines', {
      fields: ['Narudzbina_id'],
      type: 'foreign key',
      references: {
        table:'Narudzbinas',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('Kategorijas', { cascade: true });
    queryInterface.dropTable('KolekcijaModels', { cascade: true });
    queryInterface.dropTable('StavkaNarudzbines', { cascade: true });
  }
};