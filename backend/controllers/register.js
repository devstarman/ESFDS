const handleRegister = (req, res, db, bcrypt, cryptoRandomString, mailOptions, transporter) => {
    const { email, name, password } = req.body;

    if(!email || !name || !password) {
        return res.status(400).json('incorrect register form submission (empty fields)');
    }

    const hash = bcrypt.hashSync(password);
    const verificationString = cryptoRandomString(20);
    const confirmationLink = `http://127.0.0.1:3000/confirmation/`;
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('email')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date(),
                        isverified: false
                    })
                    .then(loginEmail => {
                        return trx('verification')
                            .returning('*')
                            .insert({
                                verificationstring: verificationString,
                                email: loginEmail[0],
                                verificationdate: new Date()
                            })
                            .then(user => {
                                res.json(user[0]);
                            })
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    }).
    catch( err => res.status(400).json('unable to register'));


    mailOptions.html = `Dzień dobry, <br><br>`
        + `Twoja rejestracja w systemie KFDS Politechniki Wrocławskiej przebiegła poprawnie.<br>`
        + `Prosimy o potwierdzenie rejestracji przez link: <a href="`
        + confirmationLink + verificationString + `">`+ confirmationLink + verificationString +`</a>`
        + `<br><br><br><hr><br>Wiadomość wygenerowana automatycznie, prosimy na nią nie odpowiadać.`
        + `<br>Jeśli nie jesteś adresatem tej wiadomości prosimy o jej zignorowanie.`;
    console.log('email = ', email);
    mailOptions.to = email;

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    handleRegister: handleRegister
}