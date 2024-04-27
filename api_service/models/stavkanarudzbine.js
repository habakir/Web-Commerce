'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StavkaNarudzbine extends Model {
    static associate({Kolekcija, Narudzbina}){
      this.belongsTo(Kolekcija, {foreignKey: "Kolekcija_id", as: "kolekcija"});
      this.belongsTo(Narudzbina, {foreignKey: "Narudzbina_id", as: "narudzbina"}); 
    }
  }
  StavkaNarudzbine.init({
    komada: DataTypes.INTEGER,
    jedinicna_cena: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StavkaNarudzbine',
  });
  
  return StavkaNarudzbine;
};