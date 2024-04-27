'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Narudzbina extends Model {
    static associate({Kolekcija, StavkaNarudzbine}) {
      this.hasMany(StavkaNarudzbine, { foreignKey: "Narudzbina_id", as: "narudzbina" });
    }
  }
  Narudzbina.init({
    vreme_narucivanja: DataTypes.DATE,
    zakazano_vreme: DataTypes.DATE,
    status: DataTypes.STRING,
    adresa: DataTypes.TEXT,
    telefon: DataTypes.TEXT,
    ime_prezime: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Narudzbina',
  });
  
  return Narudzbina;
};