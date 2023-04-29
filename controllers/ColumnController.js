const Column = require('../models/Column.js');
const Member = require('../models/Member.js');
const Token = require('../models/Token.js');

exports.addColumn = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            Member.checkMember(new Member({ userId: data.user_id, workspaceId: req.params.id}), (e, r) => {
                if (e || r == null) {
                    res.status(403).send({ message: "Not a member of this workspace." });
                    return;
                }
            })
            const column = new Column({
                name: req.body.name,
                workspaceId: req.params.id
            });
            Column.create(column, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while creating Column"});
                else {
                    res.send(response)
                }
            })
        }
    })    
}

exports.getColumn = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            Member.checkMember(new Member({ userId: data.user_id, workspaceId: req.params.id}), (e, r) => {
                if (e || r == null) {
                    res.status(403).send({ message: "Not a member of this workspace."});
                    return;
                }
            })
            Column.getOne(req.params.colId, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while getting Column"});
                else {
                    if (response.workspace_id == req.params.id) {
                        res.send(response);
                    } else {
                        res.status(204).send({ message: "Column does not belong to this workspace."});
                    }
                }
            })
        }
    })    
}

exports.getAllColumn = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            Member.checkMember(new Member({ userId: data.user_id, workspaceId: req.params.id}), (e, r) => {
                if (e || r == null) {
                    res.status(403).send("Not a member of this workspace.");
                    return;
                }
            })
            Column.getAllColumn(req.params.id, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while getting Column"});
                else {
                    res.send(response)
                }
            })
        }
    })     
}

exports.changeName = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            Member.checkMember(new Member({ userId: data.user_id, workspaceId: req.params.id}), (e, r) => {
                if (e || r == null) {
                    res.status(403).send("Not a member of this workspace.");
                    return;
                }
            })
            Column.changeName(req.params.colId, req.body.name, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while changing name of Column"});
                else {
                    if (response) {
                        res.send({ message: "Change name successfully." })
                    }
                }
            })
        }
    })      
}

exports.deleteColumn = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            Member.checkMember(new Member({ userId: data.user_id, workspaceId: req.params.id}), (e, r) => {
                if (e || r == null) {
                    res.status(403).send("Not a member of this workspace.");
                    return;
                }
            })
            Column.deleteOne(req.params.colId, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while changing name of Column"});
                else {
                    if (response.affectedRows) {
                        res.send({ message: "Delete successfully." })
                    } else {
                        res.status(403).send({ message: "Column does not exist."})
                    }
                }
            })
        }
    })      
}