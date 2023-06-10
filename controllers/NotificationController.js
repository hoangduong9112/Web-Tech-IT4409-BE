const Column = require('../models/Column.js');
const Member = require('../models/Member.js');
const Token = require('../models/Token.js');
const AutoNotification = require('../models/AutoNotification.js');
const Card = require('../models/Card.js');

exports.create = (req, res) => {
    try {
        Token.validate(req.headers.token, (err, data) => {
            if (err)
                res.status(401).send({ message: err.message || "Invalid Token!" })
            else {
                Member.checkMember(new Member({ userId: data.user_id, workspaceId: req.params.id }), (e, r) => {
                    if (e || r == null) {
                        res.status(403).send({ message: "Not a member of this workspacce." });
                        return;
                    }
                })
                const notification = new AutoNotification({
                    user_id: req.body.userId,
                    content: req.body.content,
                    createAt: req.body.createAt
                });
                AutoNotification.create(card, (error, response) => {
                    if (error)
                        res.status(500).send({ message: error.message || "Error while creating Notification" });
                    else {
                        res.send(response)
                    }
                })
            }
        })
    }  catch (e) {
        console.log(e);
        res.status(500).send({message:"hello"});
    }
}

exports.getAllNotification = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!" })
        else {
            Member.checkMember(new Member({ userId: data.user_id, workspaceId: req.params.id }), (e, r) => {
                if (e || r == null) {
                    res.status(403).send("Not a member of this workspace.");
                    return;
                }
            })
            AutoNotification.getAllNotification(req.params.id, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while getting Notification" });
                else {
                    res.send(response)
                }
            })
        }
    })
}

exports.getOne = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!" })
        else {
            Member.checkMember(new Member({ userId: data.user_id, workspaceId: req.params.id }), (e, r) => {
                if (e || r == null) {
                    res.status(403).send({ message: "Not a member of this workspace." });
                    return;
                }
            })
            AutoNotification.getOne(req.params.cardId, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while getting Notification" });
                else {
                    if (response.workspace_id == req.params.id) {
                        res.send(response);
                    } else {
                        res.status(204).send({ message: "Notification does not belong to this workspace." });
                    }
                }
            })
        }
    })
}