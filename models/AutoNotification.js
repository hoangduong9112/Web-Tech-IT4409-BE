const sql = require('../repository/Db.js');

const Notification = function (Notification) {
    this.user_id = Notification.userId;
    this.content = Notification.content;
    this.created_at = Notification.createAt;
}


Notification.create = (notification, result) => {
    sql.query("Insert INTO Notification SET?", notification, (err) =>{
        if (err) {
            console.log("error: ", err);
            result(err,null);
            return;
        }
        result(null, notification);
    })
}

Notification.getAllNotification = (id, result) => {
    sql.query(`SELECT * FROM Notification WHERE workspace_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else if (res.length) {
            result(null, res)
        } else {
            result(null, null)
        }
    })
}

Notification.getOne = (id, result) => {
    sql.query(`SELECT * FROM Notification WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else if (res.length) {
            result(null, res[0])
        } else {
            result(null, null)
        }
    })
}
