const User = require('../models/User.js')

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    });
  
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      else res.send(data);
    });
  };