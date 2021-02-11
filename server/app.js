const express = require("express");
const app = express();
const yup = require("yup");
const { v4 } = require("uuid");
const validateParams = require("./validation/validationParams");

const cors = require("cors");
const { user } = require("./models");
const sendEmail = require("./sendEmail");
const apiRoutes = require("./routers/api");

app.use(cors());
app.use(express.json());

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

app.use("/api", apiRoutes);

app.use((req, res) => {
  console.log("Req", req.path);
  res.status(404).json({
    message: "Not Found!",
    errors: [`Route ${req.path} does not exist!`],
  });
});

module.exports = app;
