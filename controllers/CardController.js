const Column = require('../models/Column.js');
const Member = require('../models/Member.js');
const Token = require('../models/Token.js');
const Card = require('../models/Card.js');

exports.addCard = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            Member.checkMember(new Member({ userId: data.user_id, workspaceId: req.params.id}), (e, r) => {
                if (e || r == null) {
                    res.status(403).send({ message: "Not a member of this workspacce." });
                    return;
                }
            })
            const card = new Card({
                name: req.body.name,
                description: req.body.description,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                fileUrl: req.body.file_url,
                assignedId: req.body.assigned_id,
                columnId: req.body.column_id,
                workspaceId: req.params.id,
                comment: req.body.comment
            });
            Card.create(card, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while creating Card"});
                else {
                    res.send(response)
                }
            })
        }
    })    
}

exports.getCard = (req, res) => {
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
            Card.getOne(req.params.cardId, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while getting Card"});
                else {
                    if (response.workspace_id == req.params.id) {
                        res.send(response);
                    } else {
                        res.status(204).send({ message: "Card does not belong to this workspace."});
                    }
                }
            })
        }
    })    
}

exports.getAllCard = (req, res) => {
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
            Card.getAllCard(req.params.id, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while getting Card"});
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
            Card.changeName(req.params.cardId, req.body.name, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while changing name of Card"});
                else {
                    if (response) {
                        res.send({ message: "Change name successfully." })
                    }
                }
            })
        }
    })      
}

exports.changeColumn = (req, res) => {
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
            Card.changeColumn(req.params.cardId, req.body.column_id, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while changing Column of Card"});
                else {
                    if (response) {
                        res.send({ message: "Change column successfully." })
                    }
                }
            })
        }
    })      
}

exports.deleteCard = (req, res) => {
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
            Card.deleteOne(req.params.cardId, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while changing name of Card"});
                else {
                    if (response.affectedRows) {
                        res.send({ message: "Delete successfully." })
                    } else {
                        res.status(403).send({ message: "Card does not exist."})
                    }
                }
            })
        }
    })      
}