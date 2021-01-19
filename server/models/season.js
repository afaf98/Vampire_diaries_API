"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class season extends Model {
    static associate(models) {
      season.hasMany(model.episode);
    }
  }
  season.init(
    {
      nseason: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "season",
    }
  );
  return season;
};
