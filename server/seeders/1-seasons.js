"use strict";
const seasons = require("../../scraper/seasons.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allSeasons = seasons.map((season, index) => {
      return {
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    console.log("seasons", allSeasons);

    await queryInterface.bulkInsert("seasons", allSeasons, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("seasons", null, {});
  },
};
