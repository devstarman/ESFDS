const handleAuthentication = (req, res, db, bcrypt) => {

    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json('incorrect signin form submission (empty fields)');
    }

    db.select('email', 'hash').from('login')
        .where('email', '=', username)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            console.log("isValid = " + isValid);
            if(isValid) {
                return db.select('*').from('users').where('email','=',username).where('isverified', '=', true)
                    .then(user => {
                        console.log(username + ' login successful.');
                        res.json(user[0]);
                    })
                    .catch(err => {
                        console.log('Unable to get user');
                        res.status(400).json('Unable to get user')
                    })
            } else {
                console.log("wrong credentials during login user: " + username);
                res.status(400).json('Wrong credentials');
            }
            console.log('aaa');
        })
        .catch(err => {
            console.log("err: " + err);
            console.log('400 Wrong credentials');
            res.status(400).json('Wrong credentials');
        });
}

module.exports = {
    handleAuthentication: handleAuthentication
}