const handleGetKonkursy = (req,res,db) => {
    //let orgId = req.headers["orgid"];
    // let queryStringTableOfOrgIds = '';
    // for(let i = 0; i < ids.length; i++) {
    //     if(i === ids.length-1) {
    //         querryStringTableOfIds += ids[i];
    //     } else {
    //         querryStringTableOfIds += ids[i] + ', ';
    //     }
    // }
    // db.select('*').from('organisationroles').where(db.raw('id IN ('+querryStringTableOfIds+')'))
    //console.log("handleGetUsers for orgId: " + orgId);
    console.log("handleGetKonkursy");
        db.select('*').from('konkursy').then(konkursy => {
            if(konkursy.length) {
                console.log("konkursy get - length = " + konkursy.length);
                console.log("header: " + "konkursy 0-" + konkursy.length + "/" + Math.ceil(konkursy.length/10));
                res.setHeader("Content-Range", "users 0-" + konkursy.length + "/" + Math.ceil(konkursy.length/10));
                res.setHeader("Access-Control-Expose-Headers", "Content-Range");
                res.json(konkursy);
            } else {
                res.status(400).json('Not found!');
            }
        }).catch(err => res.status(400).json('Error getting konkurs.'));
};

const handleShowEditKonkurs = (req,res,db) => {
    const { id } = req.params;
    console.log("Handling ShowEditKonkurs");
    db.select('*').from('konkursy').where({id: id}).then(konkurs => {
        if(konkurs.length) {
            res.json(konkurs[0]);
        } else {
            res.status(400).json('[EditForm] Konkurs not found!');
        }
    }).catch(err => res.status(400).json('[EditForm] Error getting konkurs!'));
};

const handleUpdateKonkurs = (req,res,db) => {
    const { id } = req.params;
    const { typkonkursu, czasrozpoczecia, czaszakonczenia } = req.body;
    console.log("Handling UpdateKonkurs with id = " + id);
    db('konkursy').where({id: id}).returning('*').where('id', '=', id)
        .update({
            typkonkursu: typkonkursu,
            czasrozpoczecia: czasrozpoczecia,
            czaszakonczenia: czaszakonczenia
        }).then(konkursy => {
        if(konkursy.length) {
            console.log("Update successful");
            res.json(konkursy[0]);
        } else {
            console.log('[UpdateKonkursForm] Konkurs not found!');
            res.status(400).json('[UpdateKonkursForm] Konkurs not found!');
        }
    }).catch(err => {
        console.log('[UpdateKonkursForm] Error getting konkurs!');
        res.status(400).json('[UpdateKonkursForm] Error getting konkurs!')
    });
};

const handlePostKonkurs = async (req,res,db) => {
    console.log("I'm here trying to post konkurs to database")
    let autorid = 1;
    const {komisjaid, typkonkursu, czasrozpoczecia, czaszakonczenia} = req.body;

    await db('konkursy').insert({
        autorid: autorid,
        komisjaid: komisjaid,
        typkonkursu: typkonkursu,
        czasrozpoczecia: czasrozpoczecia,
        czaszakonczenia: czaszakonczenia
    }).returning('*')
        .then(result => {
            if (result === 0) {
                console.log("error.");
                res.status(400).json("Error saving to database.");
            } else {
                res.status(200).json(result[0]);
            }
        }).catch(err => {
            console.log("error: " + err);
            res.status(400).json("Error saving to database.")
        });
    console.log("Success.");
};

module.exports = {
    handleGetKonkursy: handleGetKonkursy,
    handleShowEditKonkurs: handleShowEditKonkurs,
    handleUpdateKonkurs: handleUpdateKonkurs,
    handlePostKonkurs: handlePostKonkurs
}