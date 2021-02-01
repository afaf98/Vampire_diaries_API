const express = require("express");
const apiRoutes = new express.Router();
const yup = require("yup");
const validateParams = require("../validation/validationParams");
const { character, episode, season, user } = require("../models");

async function apiKeyMidleware(req, res, next) {
  const { key } = req.validatedQuery;
  delete req.query.key;
  try {
    const foundUser = await user.findOne({ where: { key: key } });

    if (foundUser === null) {
      return res.status(403).json({ message: "You need a valid key" });
    } else {
      foundUser.update({ count: foundUser.count + 1 });
      next();
      return true;
    }
  } catch (error) {
    console.log("Error", error);
  }
}

apiRoutes.use(
  validateParams(yup.object().shape({ key: yup.string().required() }), "query")
);
apiRoutes.use(apiKeyMidleware);
// Episode routes

apiRoutes.get(
  "/episodes",
  validateParams(
    yup.object().shape({
      limit: yup.number().integer().min(1).default(20),
      offset: yup.number().integer().min(0).default(0),
      title: yup.string(),
      sortBy: yup
        .string()
        .oneOf(["USviewers", "productionCode", "id"])
        .default("id"),
      sortOrder: yup.string().uppercase().oneOf(["ASC", "DESC"]).default("ASC"),
    }),
    "query"
  ),

  async (req, res) => {
    const {
      limit,
      offset,
      sortBy,
      sortOrder,

      ...validatedQuery
    } = req.validatedQuery;
    try {
      const episodes = await episode.findAll({
        offset: offset,
        limit: limit,
        where: { ...validatedQuery },
        order: [[sortBy, sortOrder]],
      });
      res.json(episodes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  }
);

apiRoutes.get(
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
apiRoutes.get("/seasons", async (req, res) => {
  try {
    const seasons = await season.findAndCountAll();

    res.json({ count: seasons.count, seasons: seasons.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error" });
  }
});

apiRoutes.get(
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

apiRoutes.get("/characters", async (req, res) => {
  try {
    const characters = await character.findAll();

    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal error" });
  }
});

apiRoutes.get("/actors", async (req, res) => {
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

module.exports = apiRoutes;
