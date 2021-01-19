"use strict";
const seasons = require("../../scraper/seasons.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allSeasons = seasons.map((season, index) => {
      return season.map((episode) => {
        return {
          ...episode,
          seasonId: index + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
    });
    const allEpisodes = allSeasons.reduce((accumulator, season) => {
      return accumulator.concat(season);
    }, []);

    await queryInterface.bulkInsert("episodes", allEpisodes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("episodes", null, {});
  },
};
