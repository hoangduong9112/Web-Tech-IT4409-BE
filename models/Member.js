const sql = require('../repository/Db.js');

const Member = function (member) {
    this.workspace_id = member.workspaceId;
    this.user_id = member.userId;
    this.role = member.role || 'MEMBER';
}

Member.create = (member, result) => {
    sql.query("INSERT INTO Member SET ?", member, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, member);   
    })
}

module.exports = Member;