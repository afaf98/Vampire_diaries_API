"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "episodes",
      "seasonId",
      {
        type: Sequelize.INTEGER,

        allowNull: true,
        foreignKey: true,
        references: {
          model: "seasons",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "episodes",
      "seasonId",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      {}
    );
    // await queryInterface.removeConstraint("episodes", "episodes_nSeason_fkey");
  },
};
