const yup = require("yup");

function validateParams(schema) {
  return async (req, res, next) => {
    try {
      const validParams = await schema.validate(req.params, {
        abortEarly: false,
      });
      req.validParams = validParams;

      next();
    } catch (error) {
      res.status(400).json({ message: "Bad request", errors: error.errors });
    }
  };
}

module.exports = validateParams;
