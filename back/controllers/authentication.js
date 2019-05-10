const handleAuthentication = (req, res, db, bcrypt) => {

    const {username, password} = req.body;

    if(!username || !password) {
        console.log("Użytkownik nie podał wszystkich danych logowania.");
        return res.status(400).json({msg: 'Proszę podać wszystkie dane logowania.'});
    }

    db.select('email', 'hash').from('login')
        .where('email', '=', username).orWhere('email','=',username+'@pwr.edu.pl').orWhere('email','=',username+'@student.pwr.edu.pl')
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            console.log("isValid = " + isValid);
            if(isValid) {
                return db.select('*').from('users').where('email','=',username).orWhere('email','=',username+'@pwr.edu.pl').orWhere('email','=',username+'@student.pwr.edu.pl')
                    .then(user => {
                        console.log(username + " poprawnie zweryfikował swoje hasło.");
                        const isVerified = user[0].isverified;
                        if(isVerified) {
                            console.log(username + " został zalogowany.");
                            res.json({roleId: user[0].organisationroleid, userId: user[0].id, orgId: user[0].organisationid});
                        } else {
                            console.log(username + " nie zalogowany ze względu na brak potwierdzenia adresu e-mail.");
                            res.status(400).json({msg: 'Nie potwierdzono adresu e-mail.'});
                        }

                    })
                    .catch(err => {
                        console.log('Nie znaleziono użytkownika.');
                        res.status(400).json({msg: 'Niepoprawne dane logowania.'});
                    })
            } else {
                console.log("Niepoprawne hasło podczas logowania użytkownika: " + username);
                res.status(400).json({msg: 'Niepoprawne dane logowania.'});
            }
        })
        .catch(err => {
            console.log('Niepoprawne dane logowania: użytkownik nie został znaleziony');
            res.status(400).json({msg: 'Niepoprawne dane logowania.'});
        });
};

module.exports = {
    handleAuthentication: handleAuthentication
}