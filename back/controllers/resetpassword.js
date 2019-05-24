const handleResetPassword = (req, res, db, cryptoRandomString, bcrypt, mailOptions, transporter) => {

    const {username} = req.body;

    if(!username) {
        console.log("Użytkownik podał pusty adres e-mail.");
        return res.status(400).json({msg: 'Użytkownik podał pusty adres e-mail.'});
    }

    db.select('email').from('login')
        .where('email', '=', username)
        .then(data => {
            if (data.length !== 0) {
                const newPassword = cryptoRandomString(10);
                const newHash = bcrypt.hashSync(newPassword);
                db('login').where('email', '=', username)
                    .update({
                        hash: newHash
                    }).then(a => {
                        if(a.length !== 0) {
                            res.json({msg: 'Hasło zostało przesłane na podany adres e-mail'});
                            console.log("Hasło zostało zmienione na: " + newPassword);
                            sendEmail(username, newPassword, mailOptions, transporter);
                        } else {
                            console.log("err: " + err);
                            res.json({resetError: 'Błąd serwera.'});
                        }
                    }).catch(err => {
                        console.log("err: " + err);
                        res.json({resetError: 'Błąd serwera.'});
                });
            } else {
                console.log("E-mail nie znaleziony.");
                res.json({resetError: 'E-mail nie znaleziony.'});
            }
        }).catch(err => {
            console.log("err: " + err);
            res.json({resetError: 'Błąd serwera.'});
        });



};

const sendEmail = (email, password, mailOptions, transporter) => {
    mailOptions.html = `Dzień dobry, <br><br>`
        + `Twoje hasło w systemie KFDS Politechniki Wrocławskiej zostało zresetowane.<br>`
        + `Nowe hasło to: ` + password
        + `<br><br><br><hr><br>Wiadomość wygenerowana automatycznie, prosimy na nią nie odpowiadać.`
        + `<br>Jeśli nie jesteś adresatem tej wiadomości prosimy o jej zignorowanie.`;
    console.log('email = ', email);
    mailOptions.to = email;
    mailOptions.subject = 'Reset hasła';

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    handleResetPassword: handleResetPassword
}