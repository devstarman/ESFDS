const handleRegister = async (req, res, db, bcrypt, cryptoRandomString, mailOptions, transporter) => {

    const { name, surname, email, mobilenumber, password, orgNameId, orgRoleId, facultyId } = req.body;

    if(!name || !surname || !email || !mobilenumber || !password || !orgNameId || !orgRoleId || !facultyId) {
        return res.status(400).json('incorrect register form submission (empty fields)');
    }

    console.log("Handling registration of " + email);

    //salt rounds - around 200ms per password
    let saltRounds = 10;
    let salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password);
    const verificationString = cryptoRandomString(20);
    console.log("verificationString: " + verificationString);
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
                        name: name,
                        surname: surname,
                        email: loginEmail[0],
                        mobilenumber: mobilenumber,
                        joined: new Date(),
                        isverified: false,
                        isacceptedbyadmin: true,
                        organisationid: orgNameId,
                        organisationroleid: orgRoleId,
                        facultyid: facultyId
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
                                console.log('User registered.')
                                res.json({msg: "Twoje konto zostało pomyślnie zarejestrowane."});
                            })
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    }).
    catch( err => res.status(400).json({errorMsg: 'Serwer zwrócił błąd.' + err}));

    mailOptions.html = `Dzień dobry, <br><br>`
        + `Twoja rejestracja w systemie KFDS Politechniki Wrocławskiej przebiegła poprawnie.<br>`
        + `Prosimy o potwierdzenie rejestracji przez link: <a href="`
        + confirmationLink + verificationString + `">`+ confirmationLink + verificationString +`</a>`
        + `<br><br><br><hr><br>Wiadomość wygenerowana automatycznie, prosimy na nią nie odpowiadać.`
        + `<br>Jeśli nie jesteś adresatem tej wiadomości prosimy o jej zignorowanie.`;
    console.log('email = ', email);
    mailOptions.to = email;

    console.log("verificationString2: " + verificationString);
    await transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
            console.log(error);
        }
        // else {
        //     //console.log('Email sent.');
        //     //await console.log('Email sent: ' + info.response);
        // }
    });
}

module.exports = {
    handleRegister: handleRegister
}