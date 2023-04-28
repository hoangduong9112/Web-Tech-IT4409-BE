const sql = require('../config/Db.js')

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

const Token = function (token) {
    this.user_id = token.user_id;
    this.token = generate_token(32);
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

// Token.findByUserId = (userId, result) => {
//     sql.query(`SELECT * FROM` )
// }