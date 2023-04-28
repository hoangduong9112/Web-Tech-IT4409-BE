const Workspace = require('../models/Workspace.js');
const Member = require('../models/Member.js');
const Token = require('../models/Token.js');

exports.create = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            const workspace = new Workspace(req.body.name);
            Workspace.create(workspace, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while creating Workspace."});
                else {
                    const member = new Member({
                        userId: data.user_id,
                        workspaceId: response.id,
                        role: 'ADMIN'
                    });
                    Member.create(member, (e, r) => {
                        if (e)
                            res.status(500).send({ message: e.message || "Error while adding user into member"})
                        else {
                            res.send(response);
                        }
                    })
                }
            })
        }
    })
}