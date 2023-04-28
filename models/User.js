const sql = require('../config/Db.js');

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
    console.log("created user: ", { id: res.insertId, email: newUser.email, username: newUser.username, role: newUser.role });
    result(null, { id: res.insertId, email: newUser.email, username: newUser.username, role: newUser.role });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM User WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else if (res.length) {
      result(null, res[0]);
      return;
    }
  })
}

User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM User WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else if (res.length) {
      result(null, res[0]);
      return;
    } else {
      result(null, null);
    }
  })
}

module.exports = User;