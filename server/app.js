const express = require("express");
const app = express();
const yup = require("yup");
const { v4 } = require("uuid");
const validateParams = require("./validation/validationParams");

const cors = require("cors");
const { character, episode, season, user } = require("./models");
const sendEmail = require("./sendEmail");

app.use(express.json());

app.use(cors());

async function apiKeyMidleware(req, res, next) {
  const { key } = req.validatedQuery;
  delete req.query.key;
  try {
    const isValid = await user.findOne({ where: { key: key } });

    if (isValid === null) {
      return res.status(403).json({ message: "You need a valid key" });
    } else {
      next();
      return true;
    }
  } catch (error) {
    console.log("Error", error);
  }
}

app.post(
  "/user",
  validateParams(
    yup.object().shape({
      email: yup.string().email(),
    }),
    "body"
  ),
  async (req, res) => {
    try {
      const { email } = req.validatedBody;
      const apiKey = v4();
      const [allUsers, newUser] = await user.findOrCreate({
        where: { email: email },
        defaults: { key: apiKey },
      });

      if (newUser) {
        sendEmail(email, apiKey);
        return res
          .status(201)
          .json({ message: "Your key has been just sent by email!" });
      } else {
        return res.status(409).json({ message: "You already have a key" });
      }
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ message: "Internal error", errors: error });
    }
  }
);

// Episode routes

app.get(
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
      key: yup.string().required(),
    }),
    "query"
  ),
  apiKeyMidleware,
  async (req, res) => {
    const {
      limit,
      offset,
      sortBy,
      sortOrder,
      key,
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
