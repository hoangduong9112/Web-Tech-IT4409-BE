const User = require('../models/User.js')
const crypto = require('crypto');

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    let pw = req.body.password;
    if (pw.length < 8) {
      res.status(400).send({ error: "Password is at least 8-character length!" });
      return;
    } else if (pw === req.body.email || pw === req.body.username) {
      res.status(400).send({ error: "Password must not be the same as email or username!"});
      console.log("OK");
      return;
    } else if (!(/[a-z]/g).test(pw) || !(/[A-Z]/g).test(pw) || !(/[0-9]/g).test(pw)) {
      res.status(400).send({ error: "Password must contain at least one lowercase, one uppercase and one number character!"});
      return;
    }
    let salt = crypto.randomBytes(16).toString('hex');
    let password = crypto.pbkdf2Sync(pw, salt, 1000, 64, `sha512`).toString(`hex`); 
    const user = new User({
      email: req.body.email,
      password: password,
      username: req.body.username,
      role: req.body.role,
      salt: salt
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