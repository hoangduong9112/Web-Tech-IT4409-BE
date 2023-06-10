const sql = require("../repository/Db.js");

const Card = function(card) {
    this.name = card.name;
    this.description = card.description;
    this.start_time = card.startTime;
    this.end_time = card.endTime;
    this.file_url = card.fileUrl;
    this.assigned_id = card.assignedId;
    this.column_id = card.columnId;
    this.workspace_id = card.workspaceId;
    this.comment = card.comment;
}

Card.create = (card, result) => {
    sql.query("Insert INTO CARD SET?", card, (err) =>{
        if (err) {
            console.log("error: ", err);
            result(err,null);
            return;
        }
        result(null, card);
    })
}

Card.getOne = (id, result) => {
    sql.query(`SELECT * FROM Card WHERE id = ${id}`, (err, res) => {
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

Card.getAllCard = (id, result) => {
    sql.query(`SELECT * FROM Card WHERE workspace_id = ${id}`, (err, res) => {
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

Card.changeName = (id, name, result) => {
    sql.query(`UPDATE Card SET name = '${name}' WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Card.changeColumn = (id, colId, result) => {
    sql.query(`UPDATE Card SET column_id = '${colId}' WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}
Card.deleteOne = (id, result) => {
    sql.query(`DELETE FROM Card WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })    
}


module.exports = Card;