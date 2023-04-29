const User = require('../models/User.js')
const Token = require('../models/Token.js')
const crypto = require('crypto');

const hashPassword = function (password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
}

// Sign Up
exports.signUp = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
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
  let password = hashPassword(pw, salt); 
  const user = new User({
    email: req.body.email,
    password: password,
    username: req.body.username,
    role: req.body.role,
    salt: salt
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred while creating the User." });
    else {
      const userToken = new Token(data.id);
      Token.create(userToken, (err, data) => {
        if (err)
          res.status(500).send({ message: err.message || "Some error occurred while creating the Token."})  
      })
      res.send({...data, token: userToken.token})
    }
  });
};

// Sign In
exports.signIn = (req, res) => {
  User.findByEmail(req.body.email, (err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred while login." })
    else {
      if (data) {
        if (data.password === hashPassword(req.body.password, data.salt)) {
          Token.findById(data.id, (error, response) => {
            if (error)
              res.status(500).send({ message: error.message || "Error while validating token." })
            else if (response) {
              res.send({ token: response.token });
            } else {
              const userToken = new Token(data.userId);
              Token.create(userToken, (err1, data1) => {
                if (err1)
                  res.status(500).send({ message: err1.message || "Some error occurred while creating the Token." }) 
                res.send({ token: data1.token}) 
              })
            }
          })
        } else {
          res.status(401).send({ message: "Wrong Password!"})
        }
      } else {
        res.status(401).send({ message: "Wrong email!"})
      }
    }
  })
}