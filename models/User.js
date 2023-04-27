const sql = require('../config/Db.js');
const crypto = require('crypto');

// constructor
const User = function(user) {
  this.email = user.email;
  this.password = user.password;
  this.username = user.username;
  this.role = user.role || 'USER';
  this.salt = null;
};



User.create = (newUser, result) => {
  let pw = newUser.password;
  if (pw.length < 8) {
    result(null, { error: "Password is at least 8-character length!" });
    return;
  } else if (pw === newUser.email || pw === newUser.username) {
    result(null, { error: "Password must not be the same as email or username!"});
    console.log("OK");
    return;
  } else if (!(/[a-z]/g).test(pw) || !(/[A-Z]/g).test(pw) || !(/[0-9]/g).test(pw)) {
    result(null, { error: "Password must contain at least one lowercase, one uppercase and one number character!"});
    return;
  }
  newUser.salt = crypto.randomBytes(16).toString('hex');
  newUser.password = crypto.pbkdf2Sync(pw, newUser.salt, 1000, 64, `sha512`).toString(`hex`); 
  sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, email: newUser.email, username: newUser.username, role: newUser.role });
    result(null, { id: res.insertId, email: newUser.email, username: newUser.username, role: newUser.role });
  });
};


module.exports = User;