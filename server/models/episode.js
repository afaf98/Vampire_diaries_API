'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class episode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  episode.init({
    nEpisode: DataTypes.INTEGER,
    title: DataTypes.STRING,
    directedBy: DataTypes.STRING,
    writtenBy: DataTypes.STRING,
    airDate: DataTypes.STRING,
    productionCode: DataTypes.INTEGER,
    USviewers: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'episode',
  });
  return episode;
};