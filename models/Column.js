const sql = require("../repository/Db.js");

const Column = function(column) {
    this.name = column.name;
    this.workspace_id = column.workspaceId;
}

Column.create = (column, result) => {
    sql.query("INSERT INTO WColumn SET ?", column, (err) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, column);
    })
}

Column.createDefault = (id, result) => {
    sql.query("INSERT INTO WColumn SET ?", new Column({ name: "To Do", workspaceId: id}), (e1) => {
        if (e1) {
            console.log("error: ", e1);
            result(e1, null);
            return;
        }
    });
    sql.query("INSERT INTO WColumn SET ?", new Column({ name: "In Progress", workspaceId: id}), (e2) => {
        if (e2) {
            console.log("error: ", e2);
            result(e2, null);
            return;
        }
    });
    sql.query("INSERT INTO WColumn SET ?", new Column({ name: "Complete", workspaceId: id}), (e3) => {
        if (e3) {
            console.log("error: ", e3);
            result(e3, null);
            return;
        }
    });
    result(null, { message: "Initiate successfully."})
}

Column.getOne = (id, result) => {
    sql.query(`SELECT * FROM WColumn WHERE id = ${id}`, (err, res) => {
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

Column.getAllColumn = (workspaceId, result) => {
    sql.query(`SELECT * FROM WColumn WHERE workspace_id = ${workspaceId}`, (err, res) => {
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

Column.changeName = (id, name, result) => {
    sql.query(`UPDATE WColumn SET name = '${name}' WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Column.deleteOne = (id, result) => {
    sql.query(`DELETE FROM WColumn WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })    
}

Column.deleteByWorkspace = (workspaceId, result) => {
    sql.query(`DELETE FROM WColumn WHERE workspace_id = ${workspaceId}`, (err) => {
        if (err) {
            console.log("error: ", err);
            result(err);
            return;
        }
        result(null);
    })    
}

module.exports = Column;