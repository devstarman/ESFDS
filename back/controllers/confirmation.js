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
            res.redirect('http://127.0.0.1:3001/');
            //update database - user verified, link expired
            //route to 3001 (frontend signin)
        } else {
            res.status(400).json('Verification failed. Wrong verification ID.');
        }
    }).catch(err => res.status(400).json('Error during verification process.'));
}

module.exports = {
    handleConfirmation: handleConfirmation
}