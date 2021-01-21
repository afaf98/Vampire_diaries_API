const express = require("express");
const app = express();

const cors = require("cors");
const { episode, season } = require("./models");

app.use(cors());

app.get("/episodes", async (req, res) => {
  const episodes = await episode.findAll();
  res.json(episodes);
});

app.get("/seasons", async (req, res) => {
  const seasons = await season.findAndCountAll();
  res.json({ count: seasons.count, seasons: seasons.rows });
});

app.get("/seasons/:seasonId/episodes", async (req, res) => {
  const episodes = await episode.findAll({
    where: { seasonId: req.params.seasonId },
  });
  res.json(episodes);
});

app.get("/episodes/:id", async (req, res) => {
  const episodeById = await episode.findByPk(req.params.id);

  res.json(episodeById);
});

module.exports = app;
