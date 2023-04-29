const sql = require('../repository/Db.js');

const Member = function (member) {
    this.workspace_id = member.workspaceId;
    this.user_id = member.userId;
    this.role = member.role || 'MEMBER';
}

Member.create = (member, result) => {
    sql.query("INSERT INTO Member SET ?", member, (err) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, member);   
    })
}

Member.checkMember = (member, result) => {
    sql.query(`SELECT * FROM Member WHERE user_id = ${member.user_id} AND workspace_id = ${member.workspace_id}`, (err, res) => {
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

Member.deleteByWorkspace = (id, result) => {
    sql.query(`DELETE FROM Member WHERE workspace_id = ${id}`, (err) => {
        if (err) {
            console.log("error: ", err);
            result(err);
            return;
        }
        result(null);
    })
}

Member.getAllMember = (id, result) => {
    sql.query(`SELECT user_id FROM Member WHERE workspace_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

module.exports = Member;