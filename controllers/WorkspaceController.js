const Workspace = require('../models/Workspace.js');
const Member = require('../models/Member.js');
const Token = require('../models/Token.js');
const User = require('../models/User.js');

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

exports.getOne = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            const member = new Member({
                userId: data.user_id,
                workspaceId: req.params.id
            })
            Member.checkMember(member, (error, response) => {
                if (error)
                    res.send(500).send({ message: error.message || "Error while checking member."});
                else {
                    if (response) {
                        Workspace.findById(req.params.id, (e, r) => {
                            if (e) {
                                res.send(500).send({ message: e.message || "Error while getting workspace."});
                            } else {
                                if (r)
                                    res.send(r);
                                else
                                    res.status(204);
                            }
                        })
                    } else {
                        res.status(401).send({ message: "Unauthorization."});
                    }
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
            const member = new Member({
                userId: data.user_id,
                workspaceId: req.params.id
            })
            Member.checkMember(member, (error, response) => {
                if (error)
                    res.send(500).send({ message: error.message || "Error while checking member."});
                else {
                    if (response.role == 'ADMIN') {
                        const workspace = new Workspace(req.body.name);
                        Workspace.updateById(req.params.id, workspace, (error, response) => {
                            if (error)
                                res.status(500).send({ message: err.message || "Error while changing name of Workspace"})
                            else {
                                res.send({ message: "Successfully updated."});
                            }
                        })
                    } else {
                        res.status(401).send({ message: "Unauthorization."});
                    }
                }
            })
        }
    })
}

exports.deleteOne = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            const member = new Member({
                userId: data.user_id,
                workspaceId: req.params.id
            })
            Member.checkMember(member, (error, response) => {
                if (error)
                    res.send(500).send({ message: error.message || "Error while checking member."});
                else {
                    if (response) {
                        if (response.role == 'ADMIN') {
                            Member.deleteByWorkspace(req.params.id, (mE) => {
                                if (mE) {
                                    res.status(500).send({ message: mE.message || "Error while deleting member."});
                                    return;
                                }
                            })
                            Workspace.deleteById(req.params.id, (wE) => {
                                if (wE)
                                    res.status(500).send({ message: wE.message || "Error while deleting workspace."});
                                else {
                                    res.send({ message: "Workspace deleted."})
                                }
                            })
                        } else {
                            res.status(403).send({ message: "Unauthorization."});
                        }
                    } else {
                        res.status(403).send({ message: "Workspace does not exist."})
                    }
                }
            })
        }
    })
}

exports.getAllMember = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            Member.getAllMember(req.params.id, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while getting member."})
                else {
                    if (response) {
                        User.findByIds(response, (e, r) => {
                            if (e)
                                res.status(500).send({ message: e.message || "Error while getting members."})
                            else {
                                res.send(r);
                            }
                        })
                    } else {
                        res.status(204);
                    }
                }
            })
        }
    })
}

exports.addMember = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            const member = new Member({
                userId: data.user_id,
                workspaceId: req.params.id
            })
            Member.checkMember(member, (error, response) => {
                if (error)
                    res.send(500).send({ message: error.message || "Error while checking member."});
                else {
                    if (response) {
                        if (response.role == 'ADMIN') {
                            const newMember = new Member({
                                userId: req.body.userId,
                                workspaceId: req.params.id,
                                role: req.body.role
                            })
                            Member.create(newMember, (e, r) => {
                                if (e)
                                    res.status(500).send({ message: e.message || "Error while creating member!"})
                                else {
                                    res.send(r);
                                }
                            })
                        }
                    } else {
                        res.status(403).send({ message: "Workspace does not exist."})    
                    }
                }
            })
        }
    })
}