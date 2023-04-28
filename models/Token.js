const sql = require('../config/Db.js');

// constructor
const Token = function(id) {
    this.user_id = id;
    this.token = generate_token(64);
}

function generate_token(length) {
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

Token.create = (token, result) => {
    sql.query("INSERT INTO Token SET ?", token, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }       
    })
}

Token.validate = (token, result) => {
    sql.query(`SELECT * FROM Token WHERE token = ${token}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else if (res.length) {
            result(null, res[0]);
            return;
        } else {
            result({error: "Invalid Token!"}, null)
        }

    })
}

Token.findById = (userId, result) => {
    sql.query(`SELECT * FROM Token WHERE user_id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else if (res.length) {
            result(null, res[0]);
            return;
        } else {
            result({message: "Invalid User!"}, null)
        }

    })
}

module.exports = Token;