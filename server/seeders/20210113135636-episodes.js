"use strict";
const seasons = require("../../scraper/seasons.json");
const extractDate = require("extract-date");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allSeasons = seasons.map((season) => {
      console.log("Season", season);
      return season.map((episode) => {
        return {
          ...episode,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
    });
    console.log("episodes", allSeasons.length);
    const allEpisodes = allSeasons.reduce((accumulator, season) => {
      return accumulator.concat(season);
    }, []);
    await queryInterface.bulkInsert("episodes", allEpisodes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("episodes", null, {});
  },
};
