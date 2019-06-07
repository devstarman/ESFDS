const handleConfirmation = (req,res,db) => {
    const { verId } = req.params;
    let found = false;
    db.select('email').from('verification').where({verificationstring: verId}).then(email => {
        if(email.length) {
            db('users')
                .where('email', '=', email[0].email)
                .update({
                    isverified: true
                }).then(a => console.log('ok'));
            console.log('Verification successful!');
            res.status(200).json('Weryfikacja udana.');
            //res.redirect('http://127.0.0.1:3001/');
            //update database - user verified, link expired
            //route to 3001 (frontend signin)
        } else {
            console.log("Brak e-maila.");
            res.status(400).json('Weryfikacja nieudana. Zły link weryfikacji.');
        }
    }).catch(err => res.status(400).json('Weryfikacja nieudana. Zły link weryfikacji.'));
}

module.exports = {
    handleConfirmation: handleConfirmation
}