"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // season.hasMany(model.episode);
      // season.belongsTo(model.episode);
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
