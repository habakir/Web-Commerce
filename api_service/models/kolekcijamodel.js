'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KolekcijaModel extends Model {
    static associate({Materijal, Kolekcija}) {
      this.belongsTo(Materijal, {foreignKey: "Materijal_id", as: "materijal"});
      this.belongsTo(Kolekcija, {foreignKey: "Kolekcija_id", as: "kolekcija"});
    }
  }
  KolekcijaModel.init({
  }, {
    sequelize,
    modelName: 'KolekcijaModel',
  });
  return KolekcijaModel;
};