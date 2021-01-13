'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('episodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nEpisode: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      directedBy: {
        type: Sequelize.STRING
      },
      writtenBy: {
        type: Sequelize.STRING
      },
      airDate: {
        type: Sequelize.STRING
      },
      productionCode: {
        type: Sequelize.INTEGER
      },
      USviewers: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('episodes');
  }
};