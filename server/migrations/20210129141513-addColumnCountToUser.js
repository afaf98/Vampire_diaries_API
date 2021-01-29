"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "count", Sequelize.INTEGER, {
      after: "key",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "count");
  },
};
