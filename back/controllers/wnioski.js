const handleGetWnioski = (req,res,db) => {
    console.log("handleGetWnioski()");
    db.select('*').from('wnioski').then(result => {
        res.setHeader("Content-Range", "users 0-" + result.length + "/" + Math.ceil(result.length/10));
        res.setHeader("Access-Control-Expose-Headers", "Content-Range");
        res.json(result);
    }).catch(err => res.status(400).json('Error getting wnioski'));
};

const handlePostWnioski = async (req,res,db) => {
    console.log("I'm here trying to post wniosek to database")
    const wniosek = req.body;
    const { nazwaprojektu, opisprojektu, planowanytermin, celprojektu, zasoby, wykazrealizacji, wspolpraca, grupaodbiorcow,
      strategiasponsorow, promocjaprojektu, aktualnystan, osobyodpowiedzialne, doswiadczeniezespolu, pozycjeharmonogramu,
      realizatorzyprojektu, kwotawnioskowana, srodkiinnepwr, umowysponsorskie, wplatyuczestnikow, grantydotacje,
      kwotazinnychogolem, kwotaogolem, rezultatbadawczy, upowszechnienie, umiejetnosci, innowacyjnosc, authorId } = req.body;

    let orgId = null;
    await db.select('organisationid').from('users').where('id','=',authorId)
        .then(result => {
            orgId = result[0].organisationid;
        }).catch(err => {console.log("err: " + err)});
    let orgTypeId = null;
    await db.select('organisationtypeid').from('organisations').where('id','=',orgId)
        .then(result => {
            orgTypeId = result[0].organisationtypeid;
        }).catch(err => {console.log("err: " + err)});
    console.log("orgTypeId: " + orgTypeId);
    let weryfikacjaOpiekuna = orgTypeId === 3 ? false : null;

    let nextWniosekId = null;
    await db('wnioski').max({id: 'id'}).then(result => {
        if(result !== 0 ) {
            nextWniosekId = result[0].id + 1;
        }
    }).catch(err => {console.log("err: " + err)});

    let kosztorysId = null;
    await db('kosztorysy').insert({
        idwniosku: nextWniosekId,
        kwotawnioskowana: kwotawnioskowana,
        srodkiinnepwr: srodkiinnepwr,
        umowysponsorskie: umowysponsorskie,
        wplatyuczestnikow: wplatyuczestnikow,
        grantydotacje: grantydotacje,
        kwotazinnychogolem: kwotazinnychogolem,
        kwotaogolem: kwotaogolem
    }).returning('*')
        .then(result => {
            kosztorysId = result[0].id;
            if(result === 0) {
                console.log("error.");
                res.status(400).json("Error saving to database.");
            }
    }).catch(err => {
        console.log("error: " + err);
        res.status(400).json("Error saving to database.")});
    console.log("Success.");

    for(o of osobyodpowiedzialne) {
        o.idwniosku = nextWniosekId;
    }
    await db('osobyodpowiedzialne').insert(osobyodpowiedzialne)
        .then(result => {
            if(result === 0 ) {
                console.log("error.");
                res.status(400).json("Error saving to database.");
            }
        }).catch(err => {console.log("err: " + err)});
    console.log("OK!");

    for(d of doswiadczeniezespolu) {
        d.idwniosku = nextWniosekId;
    }
    await db('doswiadczeniazespolu').insert(doswiadczeniezespolu)
        .then(result => {
            if(result === 0 ) {
                console.log("error.");
                res.status(400).json("Error saving to database.");
            }
        }).catch(err => {console.log("err: " + err)});
    console.log("OK2!");

    for(p of pozycjeharmonogramu) {
        p.idwniosku = nextWniosekId;
    }
    await db('pozycjeharmonogramu').insert(pozycjeharmonogramu)
        .then(result => {
            if(result === 0 ) {
                console.log("error.");
                res.status(400).json("Error saving to database.");
            }
        }).catch(err => {console.log("err: " + err)});
    console.log("OK3!");

    for(r of realizatorzyprojektu) {
        r.idwniosku = nextWniosekId;
    }
    await db('realizatorzyprojektu').insert(realizatorzyprojektu)
        .then(result => {
            if(result === 0 ) {
                console.log("error.");
                res.status(400).json("Error saving to database.");
            }
        }).catch(err => {console.log("err: " + err)});
    console.log("OK4!");

    await db('wnioski').insert({
            konkursid: 0,
            autorid: authorId,
            organizacjaid: orgId,
            typorganizacjiid: orgTypeId,
            komisjaid: 0,
            nazwaprojektu: nazwaprojektu,
            kwotawnioskowana: kwotawnioskowana,
            kwotazinnychzrodel: kwotazinnychogolem,
            kwotaogolem: kwotaogolem,
            opisprojektu: opisprojektu,
            planowanytermin: planowanytermin,
            celprojektu: celprojektu,
            zasoby: zasoby,
            wykazrealizacji: wykazrealizacji,
            wspolpraca: wspolpraca,
            grupaodbiorcow: grupaodbiorcow,
            strategiasponsorow: strategiasponsorow,
            promocjaprojektu: promocjaprojektu,
            aktualnystan: aktualnystan,
            rezultatbadawczy: rezultatbadawczy,
            upowszechnienie: upowszechnienie,
            umiejetnosci: umiejetnosci,
            innowacyjnosc: innowacyjnosc,
            kosztorysid: kosztorysId,
            datawprowadzenia: new Date(),
            weryfikacjaprezesa: false,
            weryfikacjaopiekuna: weryfikacjaOpiekuna
    })
        .then(result => {
            console.log("RESULT: " + result);
            if(result === 0) {
                console.log("error.");
                res.status(400).json("Error saving to database.");
            } else {
                res.json(result);
            }
        }).catch(err => {
            console.log("error: " + err);
            res.status(400).json("Error saving to database.")});
    console.log("Success.");
};

const handleShowEditApplication = (req,res,db) => {
    const { id } = req.params;
    let found = false;
    console.log("Handling ShowEditApplication.");
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