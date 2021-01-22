const express = require("express");
const app = express();

const cors = require("cors");
const { Characters, episode, season } = require("./models");

app.use(cors());

// Episode routes

app.get("/episodes", async (req, res) => {
  const episodes = await episode.findAll();
  res.json(episodes);
});

app.get("/episodes/:id", async (req, res) => {
  const episodeById = await episode.findByPk(req.params.id);

  res.json(episodeById);
});

//Season routes
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

//Characters routes

app.get("/characters", async (req, res) => {
  const characters = await Characters.findAll({ attributes: ["character"] });
  console.log("characters", characters);
  res.json(characters);
});

app.get("/actors", async (req, res) => {
  const actors = await Characters.findAll({ attributes: ["actor"] });

  res.json(actors);
});

app.get("/actors/episodeCount", async (req, res) => {
  const actors = await Characters.findAll({
    attributes: ["actor", "episodeCount"],
  });

  res.json(actors);
});

app.get("/characters/actors/episodeCount", async (req, res) => {
  const allCharacters = await Characters.findAll();

  res.json(allCharacters);
});

module.exports = app;
