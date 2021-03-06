function validateParams(schema, path) {
  return async (req, res, next) => {
    try {
      const validParams = await schema.validate(req[path], {
        abortEarly: false,
      });
      req[
        `validated${path.charAt(0).toUpperCase() + path.slice(1)}`
      ] = validParams;

      next();
    } catch (error) {
      res.status(400).json({ message: "Bad request", errors: error.errors });
    }
  };
}

module.exports = validateParams;
