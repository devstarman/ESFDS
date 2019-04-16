const handleGetWnioski = (req,res,db) => {
    db.select('*').from('wnioski').then(result => {
        if(result.length) {
            res.setHeader("Content-Range", "users 0-" + result.length + "/" + Math.ceil(result.length/10));
            res.setHeader("Access-Control-Expose-Headers", "Content-Range");
            res.json(result);
        } else {
            res.status(400).json('Not found!');
        }
    }).catch(err => res.status(400).json('Error getting wnioski'));
};

const handlePostWnioski = (req,res,db) => {
    console.log("I'm here trying to post wniosek to database")
    const { userId, title, body } = req.body;
    if(!userId || !title || !body) {
        console.log('incorrect register form submission (empty fields)');
        return res.status(400).json('incorrect register form submission (empty fields)');
    }

    console.log('before trx transaction');
    console.log("title = " + title);
    console.log("userId = " + userId);
    console.log("body = " + body);
    db.transaction(trx => {
        trx.insert({
            nazwa: title,
            autorid: userId,
            wnioskowanakwota: 0,
            opis: body,
            datawprowadzenia: new Date(),
            czyzweryfikowany: false
        })
            .into('wnioski')
            .returning('*').where('nazwa', '=', title)
            .then(wniosek => {
                console.log('Wniosek o tytule "' + wniosek + '" zarejestrowany.')
                res.json(wniosek);
            })
            .then(trx.commit)
            .catch(trx.rollback)
    }).catch( err => {
        console.log('unable to register wniosek');
        res.status(400).json('unable to register wniosek');
    });
};

const handleShowEditApplication = (req,res,db) => {
    const { id } = req.params;
    let found = false;
    console.log("Handling ShowEditApplication");
    db.select('*').from('wnioski').where({id: id}).then(application => {
        if(application.length) {
            res.json(application[0]);
        } else {
            res.status(400).json('[EditForm] Application not found!');
        }
    }).catch(err => res.status(400).json('[EditForm] Error getting application!'));
};

const handleUpdateApplication = (req,res,db) => {
    const { id } = req.params;
    const { nazwa, wnioskowanakwota, opis, datawprowadzenia } = req.body;
    console.log("Handling UpdateApplication with id = " + id);
    db('wnioski').where({id: id}).returning('*').where('id', '=', id)
    .update({
        nazwa: nazwa,
        wnioskowanakwota: wnioskowanakwota,
        opis: opis,
        datawprowadzenia: datawprowadzenia
    }).then(application => {
        if(application.length) {
            console.log("Update successful");
            res.json(application[0]);
        } else {
            console.log('[UpdateForm] Application not found!');
            res.status(400).json('[UpdateForm] Application not found!');
        }
    }).catch(err => {
        console.log('[UpdateForm] Error getting application!');
        res.status(400).json('[UpdateForm] Error getting application!')
    });
};

module.exports = {
    handleGetWnioski: handleGetWnioski,
    handlePostWnioski: handlePostWnioski,
    handleShowEditApplication: handleShowEditApplication,
    handleUpdateApplication: handleUpdateApplication
};