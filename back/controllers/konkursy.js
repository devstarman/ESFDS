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

    console.log("handleGetKonkursy()");
    const query = req.query;
    if(query.filter !== undefined) {
        console.log("query filter");
        //console.log("getManyFromDataProvider, query: " + query.filter.toString());
        let data = convertCrappyJson(query.filter);
        let ids = data.id ? data.id : data.ids;
        let querryStringTableOfIds = '';
        for(let i = 0; i < ids.length; i++) {
            if(i === ids.length-1) {
                querryStringTableOfIds += ids[i];
            } else {
                querryStringTableOfIds += ids[i] + ', ';
            }
        }
        db.select('*').from('konkursy').where(db.raw('id IN ('+querryStringTableOfIds+')'))
            .then(result => {
                //console.log("queryString: " + querryStringTableOfIds);
                //console.log("result: " + JSON.stringify(result[0]));
                res.status(200).json(result);
            })
            .catch(err => {
                console.log("err: " + err);
            });
    } else {
        //console.log("query: " + query.toString());
        db.select('*').from('konkursy').then(konkursy => {
            if(konkursy.length) {
                //console.log("konkursy get - length = " + konkursy.length);
                //console.log("header: " + "konkursy 0-" + konkursy.length + "/" + Math.ceil(konkursy.length/10));
                res.setHeader("Content-Range", "konkursy 0-" + konkursy.length + "/" + Math.ceil(konkursy.length/10));
                res.setHeader("Access-Control-Expose-Headers", "Content-Range");
                res.status(200).json(konkursy);
            } else {
                res.status(400).json('Not found!');
            }
        }).catch(err => res.status(400).json('Error getting konkursy'));
    }
};

const handleShowEditKonkurs = (req,res,db) => {
    const { id } = req.params;
    console.log("Handling ShowEditKonkurs");

    if(isNaN(id)) {
        console.log("Niepoprawne ID.");
        return res.status(400).json({msg: 'Niepoprawne ID.'});
    }

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
    const { komisjaid, typkonkursu, czasrozpoczecia, czaszakonczenia } = req.body;

    console.log("Handling UpdateKonkurs with id = " + id);

    if(isNaN(id)) {
        console.log("Niepoprawne ID.");
        return res.status(400).json({msg: 'Niepoprawne ID.'});
    }
    if(!komisjaid || !typkonkursu || !czasrozpoczecia || !czaszakonczenia) {
        console.log("Użytkownik nie podał wszystkich danych.");
        return res.status(400).json({msg: 'Proszę podać wszystkie dane.'});
    }

    console.log(komisjaid + " , " + typkonkursu + " , " + czasrozpoczecia + " , " + czaszakonczenia);
    db('konkursy').where({id: id})
        .update({
            komisjaid: komisjaid,
            typkonkursu: typkonkursu,
            czasrozpoczecia: czasrozpoczecia,
            czaszakonczenia: czaszakonczenia
        }).returning('*').where('id', '=', id)
        .then(konkursy => {
            console.log("konkursy: " + JSON.stringify(konkursy))
        if(konkursy.length) {
            console.log("Update successful");
            res.json(konkursy[0]);
        } else {
            console.log('[UpdateKonkursForm] Konkurs update error!');
            res.status(400).json('[UpdateKonkursForm] Konkurs update error!');
        }
    }).catch(err => {
        console.log('[UpdateKonkursForm] Konkurs update error!');
        res.status(400).json('[UpdateKonkursForm] Konkurs update error!');
    });
};

const handlePostKonkurs = async (req,res,db) => {
    console.log("Handle Post Konkurs")
    const {komisjaid, typkonkursu, czasrozpoczecia, czaszakonczenia, authorId} = req.body;

    if(!komisjaid || !typkonkursu || !czasrozpoczecia || !czaszakonczenia || !authorId) {
        console.log("Użytkownik nie podał wszystkich danych.");
        console.log(komisjaid + " , " + typkonkursu + " , " + czaszakonczenia + " , " + czasrozpoczecia + " , " + authorId);
        return res.status(400).json({msg: 'Proszę podać wszystkie dane.'});
    }

    await db('konkursy').insert({
        autorid: authorId,
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
                res.status(200).json(result[0].id);
                //res.status(200).json(result[0]);
            }
        }).catch(err => {
            console.log("error: " + err);
            res.status(400).json("Error saving to database.")
        });
    console.log("Success.");
};

const handlePostKonkursWithId = async (req,res,db) => {
    console.log("Handle Post Konkurs With Id");
    const { id } = req.params;
    if(isNaN(id)) {
        console.log("Niepoprawne ID.");
        return res.status(400).json({msg: 'Niepoprawne ID.'});
    }
    const {komisjaid, typkonkursu, czasrozpoczecia, czaszakonczenia, authorId} = req.body;

    if(!komisjaid || !typkonkursu || !czasrozpoczecia || !czaszakonczenia || !authorId) {
        console.log("Użytkownik nie podał wszystkich danych.");
        console.log(komisjaid + " , " + typkonkursu + " , " + czaszakonczenia + " , " + czasrozpoczecia + " , " + authorId);
        return res.status(400).json({msg: 'Proszę podać wszystkie dane.'});
    }

    await db('konkursy').insert({
        id: id,
        autorid: authorId,
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
                res.status(200).json(result[0].id);
                //res.status(200).json(result[0]);
            }
        }).catch(err => {
            console.log("error: " + err);
            res.status(400).json("Error saving to database.")
        });
    console.log("Success.");
};

const getManyKonkursyTypesFromDataProvider = (req, res, db) => {
    console.log("getManyKonkursyTypesFromDataProvider()");
    //let resource = req.headers["resource"];
    const query = req.query;
    if(query.filter !== undefined) {
        //console.log("query filter");
        //console.log("getManyFromDataProvider, query: " + query.filter.toString());
        let data = convertCrappyJson(query.filter);
        let ids = data.id ? data.id : data.ids;
        let querryStringTableOfIds = '';
        for(let i = 0; i < ids.length; i++) {
            if(i === ids.length-1) {
                querryStringTableOfIds += ids[i];
            } else {
                querryStringTableOfIds += ids[i] + ', ';
            }
        }
        db.select('*').from('typykonkursow').where(db.raw('id IN ('+querryStringTableOfIds+')'))
            .then(result => {
                console.log("queryString: " + querryStringTableOfIds);
                console.log("result: " + JSON.stringify(result[0]));
                res.json(result);
            })
            .catch(err => {
                console.log("err: " + err);
            });
    } else {
        console.log("query: " + query.toString());
        db.select('*').from('typykonkursow').then(typykonkursow => {
            if(typykonkursow.length) {
                console.log("typykonkursow get - length = " + typykonkursow.length);
                console.log("header: " + "typykonkursow 0-" + typykonkursow.length + "/" + Math.ceil(typykonkursow.length/10));
                res.setHeader("Content-Range", "typykonkursow 0-" + typykonkursow.length + "/" + Math.ceil(typykonkursow.length/10));
                res.setHeader("Access-Control-Expose-Headers", "Content-Range");
                res.json(typykonkursow);
            } else {
                res.status(400).json('Not found!');
            }
        }).catch(err => res.status(400).json('Error getting typykonkursow'));
    }
};

function convertCrappyJson(crappyJson) {
    let Hjson = require('hjson');
    console.log("Converting crappy json: " + crappyJson);
    return Hjson.parse(crappyJson);
}

const handleDeleteKonkurs = (req,res,db) => {
    const { id } = req.params;
    console.log("Handling DeleteKonkurs");

    if(isNaN(id)) {
        console.log("Niepoprawne ID.");
        return res.status(400).json({msg: 'Niepoprawne ID.'});
    }

    db('konkursy').where({id: id}).del().returning('*')
        .then((affectedRows) => {
            if((affectedRows) !== 0) {
                console.log("Success deleting konkurs");
                res.status(200).json(affectedRows[0]);
            } else {
                console.log("[DeleteKonkurs] Something went wrong. No affected rows.");
                res.status(200).json("[DeleteKonkurs] Something went wrong. No affected rows.");
            }
        })
        .catch((err) => {
            console.log("[DeleteKonkurs] Error deleting konkurs.");
            res.status(400).json("[DeleteKonkurs] Error deleting konkurs.");
        });
};

module.exports = {
    handleGetKonkursy: handleGetKonkursy,
    handleShowEditKonkurs: handleShowEditKonkurs,
    handleUpdateKonkurs: handleUpdateKonkurs,
    handlePostKonkurs: handlePostKonkurs,
    getManyKonkursyTypesFromDataProvider: getManyKonkursyTypesFromDataProvider,
    handleDeleteKonkurs: handleDeleteKonkurs,
    handlePostKonkursWithId: handlePostKonkursWithId,
}