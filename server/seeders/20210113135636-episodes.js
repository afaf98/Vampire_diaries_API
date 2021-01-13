"use strict";
const seasons = require("../../scraper/seasons.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const episodes = seasons.map((season) => {
      return season.episodes.map((episode) => {
        return {
          nEpisode: parseInt(episode["No.overall"]),
          title: episode["Title"],
          directedBy: episode["Directed by"],
          writtenBy: episode["Written by"],
          airDate: episode["Original air date"],
          productionCode: episode["Prod.code"],
          USviewers: parseFloat(
            episode["U.S. viewers(millions)"].substring(
              0,
              episode["U.S. viewers(millions)"].indexOf("[")
            )
          ),
          nSeason: episode["No. inseason"],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
    });
    const allEpisodes = episodes.reduce((accumulator, season) => {
      return accumulator.concat(season);
    }, []);
    console.log(allEpisodes);

    await queryInterface.bulkInsert("episodes", allEpisodes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("episodes", null, {});
  },
};
