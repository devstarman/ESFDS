const handleGetUsers = (req,res,db) => {
    let orgId = req.headers["orgid"];
    console.log("handleGetUsers for orgId: " + orgId);
    if(orgId != 4) {
        db.select('*').from('users').where('organisationid','=',orgId).then(user => {
            if(user.length) {
                console.log("users get - length = " + user.length);
                console.log("header: " + "users 0-" + user.length + "/" + Math.ceil(user.length/10));
                res.setHeader("Content-Range", "users 0-" + user.length + "/" + Math.ceil(user.length/10));
                res.setHeader("Access-Control-Expose-Headers", "Content-Range");
                res.json(user);
            } else {
                res.status(400).json('Not found!');
            }
        }).catch(err => res.status(400).json('Error getting user'));
    } else if(orgId == 4) {
        db.select('*').from('users').then(user => {
            if(user.length) {
                console.log("users get - length = " + user.length);
                console.log("header: " + "users 0-" + user.length + "/" + Math.ceil(user.length/10));
                res.setHeader("Content-Range", "users 0-" + user.length + "/" + Math.ceil(user.length/10));
                res.setHeader("Access-Control-Expose-Headers", "Content-Range");
                res.json(user);
            } else {
                res.status(400).json('Not found!');
            }
        }).catch(err => res.status(400).json('Error getting user'));
    }
};

const getManyFromDataProvider = (req, res, db) => {
    console.log("users getManyFromDataProvider()");
    const query = req.query;
    if(query.filter !== undefined) {
        console.log("query filter");
        console.log("users getManyFromDataProvider, query: " + query.filter.toString());
        let data = convertCrappyJson(query.filter);
        let ids = data.id ? data.id : data.ids;
        let querryStringTableOfIds = '';
        for(let i = 0; i < ids.length; i++) {
            if(i === ids.length-1) {
                querryStringTableOfIds += ids[i];
            } else {
                querryStringTableOfIds += ids[i] + ', ';
            }
        }
        db.select('*').from('users').where(db.raw('id IN ('+querryStringTableOfIds+')'))
            .then(result => {
                console.log("queryString: " + querryStringTableOfIds);
                console.log("result: " + JSON.stringify(result[0]));
                res.json(result);
            })
            .catch(err => {
                console.log("err: " + err);
            });
    } else {
        console.log("query: " + query.toString());
        db.select('*').from('users').then(users => {
            if(users.length) {
                console.log("users get - length = " + users.length);
                console.log("header: " + "users 0-" + users.length + "/" + Math.ceil(users.length/10));
                res.setHeader("Content-Range", "users 0-" + users.length + "/" + Math.ceil(users.length/10));
                res.setHeader("Access-Control-Expose-Headers", "Content-Range");
                res.json(users);
            } else {
                res.status(400).json('Not found!');
            }
        }).catch(err => res.status(400).json('Error getting users'));
    }
};

const handleShowEditUser = (req,res,db) => {
    const { id } = req.params;
    console.log("Handling ShowEditUser");
    db.select('*').from('users').where({id: id}).then(user => {
        if(user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('[EditForm] User not found!');
        }
    }).catch(err => res.status(400).json('[EditForm] Error getting user!'));
};

const handleUpdateUser = (req,res,db) => {
    const { id } = req.params;
    const { torganisationroleid, isacceptedbyadmin } = req.body;
    console.log("Handling UpdateUser with id = " + id);
    console.log("torganisationroleid: " + torganisationroleid);
    console.log("isacceptedbyadmin: " + isacceptedbyadmin);
    db('users').where({id: id}).returning('*').where('id', '=', id)
        .update({
            organisationroleid: torganisationroleid,
            isacceptedbyadmin: isacceptedbyadmin,
        }).then(user => {
        if(user.length) {
            console.log("Update successful");
            res.json(user[0]);
        } else {
            console.log('[UpdateUserForm] User not found!');
            res.status(400).json('[UpdateUserForm] User not found!');
        }
    }).catch(err => {
        console.log('[UpdateUserForm] Error getting user!');
        res.status(400).json('[UpdateUserForm] Error getting user!')
    });
};

function convertCrappyJson(crappyJson) {
    let Hjson = require('hjson');
    console.log("Converting crappy json: " + crappyJson);
    return Hjson.parse(crappyJson);
}

const handleDeleteUser = (req,res,db) => {
    const { id } = req.params;
    console.log("Handling DeleteUser");
    db('users').where({id: id}).del().returning('*')
        .then((affectedRows) => {
            if((affectedRows) !== 0) {
                console.log("Success deleting user");
                res.status(200).json(affectedRows[0]);
            } else {
                console.log("[DeleteUser] Something went wrong. No affected rows.");
                res.status(200).json("[DeleteUser] Something went wrong. No affected rows.");
            }
        })
        .catch((err) => {
            console.log("[DeleteUser] Error deleting user.");
            res.status(400).json("[DeleteUser] Error deleting user.");
        });
};

module.exports = {
    handleGetUsers: handleGetUsers,
    getManyFromDataProvider: getManyFromDataProvider,
    handleShowEditUser: handleShowEditUser,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser,
}