'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kolekcija extends Model {
    static associate({Kategorija, Materijal, StavkaNarudzbine}) {
      this.belongsTo(Kategorija, {foreignKey: "Kategorija_id", as: "kategorija"});
      this.hasMany(StavkaNarudzbine, {foreignKey: "Kolekcija_id", as: "stavke"});
      this.belongsToMany(Materijal, {foreignKey: "Kolekcija_id", as: "materijali", through:"KolekcijaModel"});
    }
  }
  Kolekcija.init({
    naziv: DataTypes.STRING(120),
    opis: DataTypes.TEXT,
    cena: DataTypes.INTEGER,
    Kategorija_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Kolekcija',
  });


  return Kolekcija;
};