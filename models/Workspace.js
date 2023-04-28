const sql = require('../repository/Db.js');

const Workspace = function(name) {
    this.name = name;
}

Workspace.create = (workspace, result) => {
    sql.query("INSERT INTO Workspace SET ?", workspace, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, name: workspace.name});
    })
}

Workspace.changeNameById = (workspace, result) => {
    sql.query(`UPDATE Workspace SET name = '${workspace.name} WHERE id = ${workspace.id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

module.exports = Workspace;