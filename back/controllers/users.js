const handleGetUsers = (req,res,db) => {
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

module.exports = {
    handleGetUsers: handleGetUsers
}