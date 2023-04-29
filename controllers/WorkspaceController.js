const Workspace = require('../models/Workspace.js');
const Member = require('../models/Member.js');
const Token = require('../models/Token.js');
const Column = require('../models/Column.js');

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
                    Member.create(member, (e1, r1) => {
                        if (e1)
                            res.status(500).send({ message: e.message || "Error while adding user into member"})
                        else {
                            Column.createDefault(response.id, (e2, r2) => { console.log("error: ", e2)})
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
                    res.status(500).send({ message: error.message || "Error while checking member."});
                else {
                    if (response) {
                        Workspace.findById(req.params.id, (e, r) => {
                            if (e) {
                                res.send(500).send({ message: e.message || "Error while getting workspace."});
                            } else {
                                if (r)
                                    res.send(r);
                                else
                                    res.status(204).send();
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
                    res.status(500).send({ message: error.message || "Error while checking member."});
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
                    if (response?.role == 'ADMIN') {
                        Member.deleteByWorkspace(req.params.id, (mE) => {
                            if (mE) {
                                res.status(500).send({ message: mE.message || "Error while deleting member."});
                                return;
                            }
                        })
                        Column.deleteByWorkspace(req.params.id, (cE) => {
                            if (cE) {
                                res.status(500).send({ message: cE.message || "Error while deleting member."});
                                return;
                            }
                        })
                        Workspace.deleteById(req.params.id, (wE, wR) => {
                            if (wE)
                                res.status(500).send({ message: wE.message || "Error while deleting workspace."});
                            else {
                                if (wR.affectedRows) {
                                    res.send({ message: "Workspace deleted."})
                                } else {
                                    res.status(403).send({ message: "Workspace does not exist."})
                                }
                            }
                        })
                    } else {
                        res.status(403).send({ message: "Unauthorization."});
                    }
                }
            })
        }
    })
}

exports.getAllWorkspace = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            Workspace.getAllWorkspace(data.user_id, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while getting workspace."});
                else {
                    if (response) {
                        res.send(response);
                    } else {
                        res.status(204).send();
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
                    res.status(500).send({ message: error.message || "Error while getting member."});
                else {
                    if (response) {
                        res.send(response);
                    } else {
                        res.status(204).send();
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
                    res.status(500).send({ message: error.message || "Error while checking member."});
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

exports.updateRole = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            const user = new Member({
                userId: data.user_id,
                workspaceId: req.params.id
            })
            Member.checkMember(user, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while checking member."});
                else {
                    if (response?.role == 'ADMIN') {
                        const member = new Member({
                            userId: req.body.userId,
                            workspaceId: req.params.id,
                            role: req.body.role
                        })
                        Member.updateRole(member, (e, r) => {
                            if (e)
                                res.status(500).send({ message: e.message || "Error while updating role"})
                            else {
                                res.send({ message: "Update Role successfully."})
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

exports.deleteMember = (req, res) => {
    Token.validate(req.headers.token, (err, data) => {
        if (err)
            res.status(401).send({ message: err.message || "Invalid Token!"})
        else {
            const user = new Member({
                userId: data.user_id,
                workspaceId: req.params.id
            })
            Member.checkMember(user, (error, response) => {
                if (error)
                    res.status(500).send({ message: error.message || "Error while checking member."});
                else {
                    if (response?.role == 'ADMIN') {
                        const member = new Member({
                            userId: req.body.userId,
                            workspaceId: req.params.id,
                        })
                        Member.deleteOne(member, (e, r) => {
                            if (e)
                                res.status(500).send({ message: e.message || "Error while deleting member."})
                            else {
                                if (r.affectedRows) {
                                    res.send({ message: "Member has been deleted."})
                                } else {
                                    res.status(403).send({ message: "Member is not in Workspace."})
                                }
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