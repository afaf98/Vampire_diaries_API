'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Characters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Characters.init({
    character: DataTypes.STRING,
    actor: DataTypes.STRING,
    episodeCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Characters',
  });
  return Characters;
};