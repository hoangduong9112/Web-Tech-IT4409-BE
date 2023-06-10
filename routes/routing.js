module.exports = app => {
  const users = require("../controllers/UserController.js");
  const workspaces = require("../controllers/WorkspaceController.js");
  const columns = require("../controllers/ColumnController.js");
  const cards = require("../controllers/CardController.js");
  const notifications = require("../controllers/NotificationController.js");

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

  // Card
  router.post("/workspace/:id/card", cards.addCard);
  router.get("/workspace/:id/card", cards.getAllCard);
  router.get("/workspace/:id/card/:cardId", cards.getCard);
  router.patch("/workspace/:id/card/:cardId", cards.changeName);
  router.patch("/workspace/:id/card/changecolumn/:cardId", cards.changeColumn);
  router.delete("/workspace/:id/card/:cardId", cards.deleteCard);
  
  //Notification
  router.post("/workspace/:id/notification", notifications.create);
  router.get("/workspace/:id/notification", notifications.getAllNotification);
  router.get("/workspace/:id/notification/:notificationId", notifications.getOne);
  
  app.use('/api/', router);
};
