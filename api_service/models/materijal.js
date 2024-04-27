'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materijal extends Model {
    static associate({Kolekcija}) {
      this.belongsToMany(Kolekcija, {foreignKey: "Materijal_id", as: "materijali", through: "KolekcijaModel"});
    }
  }
  Materijal.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Materijal',
  });
  
  return Materijal;
};