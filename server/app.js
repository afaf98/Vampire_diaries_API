const express = require("express");
const app = express();
const yup = require("yup");
const validateParams = require("./validation/validationParams");

const cors = require("cors");
const { character, episode, season } = require("./models");

app.use(cors());

// Episode routes

app.get(
  "/episodes",
  validateParams(
    yup.object().shape({
      limit: yup.number().integer().min(1).default(20),
      offset: yup.number().integer().min(0).default(0),
      title: yup.string(),
    }),
    "query"
  ),
  async (req, res) => {
    const { limit, offset, ...validatedQuery } = req.validatedQuery;
    try {
      const episodes = await episode.findAll({
        offset: offset,
        limit: limit,
        where: { ...validatedQuery },
      });
      res.json(episodes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  }
);

app.get(
  "/episodes/:id",
  validateParams(
    yup.object().shape({ id: yup.number().required().positive().integer() }),
    "params"
  ),
  async (req, res) => {
    const { id } = req.validatedParams;
    try {
      const episodeById = await episode.findByPk(id);

      res.json(episodeById);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  }
);

//Season routes
app.get("/seasons", async (req, res) => {
  try {
    const seasons = await season.findAndCountAll();

    res.json({ count: seasons.count, seasons: seasons.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error" });
  }
});

app.get(
  "/seasons/:seasonId/episodes",
  validateParams(
    yup
      .object()
      .shape({ seasonId: yup.number().required().positive().integer() }),
    "params"
  ),
  async (req, res) => {
    try {
      const episodes = await episode.findAll({
        where: { ...req.validatedParams },
      });
      res.json(episodes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  }
);

//Characters routes

app.get("/characters", async (req, res) => {
  try {
    const characters = await character.findAll();

    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error" });
  }
});

app.get("/actors", async (req, res) => {
  try {
    const actors = await character.findAll({
      attributes: ["actor", "episodeCount"],
    });

    res.json(actors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error" });
  }
});

module.exports = app;
