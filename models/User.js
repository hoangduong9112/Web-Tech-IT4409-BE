const sql = require('../repository/Db.js');

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
  sql.query(`SELECT id, username, email, role FROM User WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res.length) {
      result(null, res[0]);
    }
  })
}

User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM User WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res.length) {
      result(null, res[0]);
    } else {
      result(null, null);
    }
  })
}

User.findByIds = (members, result) => {
  let criteria ="";
  for (let i = 0; i < members.length; i++) {
    criteria = criteria.concat(`id = ${members[i].user_id}`);
    if (i < members.length - 1)
      criteria = criteria.concat(" OR ");
  }
  sql.query(`SELECT id, username, email, role FROM User WHERE ${criteria}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res.length) {
      result(null, res);
    } else {
      result(null, null)
    }
  })
}

module.exports = User;