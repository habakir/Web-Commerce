'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kategorija extends Model {
    static associate({Kolekcija}) {
      this.hasMany(Kolekcija, {foreignKey: "Kategorija_id", as: "kolekcija"});
    }
  }
  Kategorija.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kategorija',
  });
  return Kategorija;
};