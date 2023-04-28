module.exports = app => {
  const users = require("../controllers/UserController.js");
  const workspaces = require("../controllers/WorkspaceController.js");

  var router = require("express").Router();
  
  // User
  router.post("/user/signup", users.signUp);
  router.post("/user/signin", users.signIn);

  // Workspace
  router.post("/workspace", workspaces.create);

  app.use('/api/', router);
};
