const sql = require('../config/Db.js');
const Token = require('../models/Token.js')

// constructor
const User = function(user) {
  this.email = user.email;
  this.password = user.password;
  this.username = user.username;
  this.role = user.role || 'USER';
  this.salt = user.salt;
};



User.create = (newUser, result) => {
  sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    const userToken = new Token({ id: res.insertId});
    Token.create({

    })
    console.log("created user: ", { id: res.insertId, email: newUser.email, username: newUser.username, role: newUser.role, token: userToken.token });
    result(null, { id: res.insertId, email: newUser.email, username: newUser.username, role: newUser.role, token: userToken.token  });
  });
};


module.exports = User;