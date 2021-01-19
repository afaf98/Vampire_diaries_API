"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class episode extends Model {
    static associate(models) {
      episode.belongsTo(model.season);
    }
  }
  episode.init(
    {
      nEpisode: DataTypes.INTEGER,
      title: DataTypes.STRING,
      directedBy: DataTypes.TEXT,
      writtenBy: DataTypes.TEXT,
      airDate: DataTypes.DATEONLY,
      productionCode: DataTypes.STRING,
      USviewers: DataTypes.FLOAT,
      nSeason: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "episode",
    }
  );
  return episode;
};
