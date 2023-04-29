module.exports = app => {
  const users = require("../controllers/UserController.js");
  const workspaces = require("../controllers/WorkspaceController.js");

  var router = require("express").Router();
  
  // User
  router.post("/user/signup", users.signUp);
  router.post("/user/signin", users.signIn);

  // Workspace
  router.post("/workspace", workspaces.create);
  router.get("/workspace/:id", workspaces.getOne);
  router.patch("/workspace/:id", workspaces.changeName);
  router.delete("/workspace/:id", workspaces.deleteOne);
  router.post("/workspace/:id/member", workspaces.addMember);
  router.get("/workspace/:id/member", workspaces.getAllMember);

  app.use('/api/', router);
};
