module.exports = app => {
  const users = require("../controllers/UserController.js");
  const workspaces = require("../controllers/WorkspaceController.js");
  const columns = require("../controllers/ColumnController.js");

  var router = require("express").Router();
  
  // User
  router.post("/user/signup", users.signUp);
  router.post("/user/signin", users.signIn);

  // Workspace
  router.get("/workspace", workspaces.getAllWorkspace)
  router.post("/workspace", workspaces.create);
  router.get("/workspace/:id", workspaces.getOne);
  router.patch("/workspace/:id", workspaces.changeName);
  router.delete("/workspace/:id", workspaces.deleteOne);
  router.post("/workspace/:id/member", workspaces.addMember);
  router.get("/workspace/:id/member", workspaces.getAllMember);
  router.patch("/workspace/:id/member", workspaces.updateRole);
  router.delete("/workspace/:id/member", workspaces.deleteMember);

  // Column
  router.get("/workspace/:id/column", columns.getAllColumn);
  router.post("/workspace/:id/column", columns.addColumn);
  router.get("/workspace/:id/column/:colId", columns.getColumn);
  router.patch("/workspace/:id/column/:colId", columns.changeName);
  router.delete("/workspace/:id/column/:colId", columns.deleteColumn);

  app.use('/api/', router);
};
