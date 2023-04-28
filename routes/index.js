module.exports = app => {
  const users = require("../controllers/UserController.js");

  var router = require("express").Router();

  router.post("/signup", users.signUp);
  router.post("/signin", users.signIn);

  app.use('/api/user', router);
};
