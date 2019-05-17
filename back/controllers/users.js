const handleGetUsers = (req,res,db) => {
    let orgId = req.headers["orgid"];
    // let queryStringTableOfOrgIds = '';
    // for(let i = 0; i < ids.length; i++) {
    //     if(i === ids.length-1) {
    //         querryStringTableOfIds += ids[i];
    //     } else {
    //         querryStringTableOfIds += ids[i] + ', ';
    //     }
    // }
    // db.select('*').from('organisationroles').where(db.raw('id IN ('+querryStringTableOfIds+')'))
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

module.exports = {
    handleGetUsers: handleGetUsers,
    handleShowEditUser: handleShowEditUser,
    handleUpdateUser: handleUpdateUser,
}