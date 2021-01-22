"use strict";
const characters = require("../data/characters.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allCharacters = characters.map((character) => {
      console.log("what is character", character);
      return {
        character: character.character,
        actor: character.actor,
        episodeCount: character.episodeCount,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("Characters", allCharacters, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Characters", null, {});
  },
};
