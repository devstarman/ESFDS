const handleGetProfile = (req,res,db) => {
    const { id } = req.params;
    console.log("handleGetProfile (user) with id: " + id);
    db.select('*').from('users').where('id','=',id).then(users => {
        if(users.length) {
            res.json(users[0]);
        } else {
            res.status(400).json('Not found!');
        }
    }).catch(err => res.status(400).json('Error getting user'));
};

const handleUpdateProfile = (req,res,db,bcrypt) => {
    const { id } = req.params;
    const { name, surname, email, mobilenumber, password, password2 } = req.body;
    console.log("Handling UpdateProfile with id = " + id);
    console.log("password: " + password);
    db('users').where({id: id}).returning('*').where('id', '=', id)
        .update({
            name: name,
            surname: surname,
            email: email,
            mobilenumber: mobilenumber,
        }).then(user => {
        if(user.length) {
            let saltRounds = 10;
            let salt = bcrypt.genSaltSync(saltRounds);
            const newHash = bcrypt.hashSync(password);
            db('login').where({email: email}).returning('*').where('email', '=', email)
                .update({
                    hash: newHash,
                }).then(user2 => {
                if (user2.length) {
                    console.log("Update successful");
                    res.json(user[0]);
                } else {
                    console.log('[UpdateUserForm] User not found!');
                    res.status(400).json('[UpdateUserForm] User not found!');
                }
            });
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
    handleGetProfile: handleGetProfile,
    handleUpdateProfile: handleUpdateProfile,
};