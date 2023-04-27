module.exports = app => {
  const users = require("../controllers/UserController.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/signUp", users.create);

  app.use('/api/user', router);
};
