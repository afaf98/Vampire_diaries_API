"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class season extends Model {
    static associate(models) {
      season.hasMany(models.episode);
    }
  }
  season.init(
    {},
    {
      sequelize,
      modelName: "season",
    }
  );
  return season;
};
