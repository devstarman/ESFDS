const getOrganisationTypes = (req, res, db) => {
    db.select('id', 'organisationtype').from('organisationtypes')
        .then(data => {
            if(data[0]) {
                console.log("organisation 1: " + data[0].organisationtype);
                res.json(data);
            } else {
                console.log('OrganisationType error.');
                res.status(400).json({msg: 'OrganisationType error.'});
            }
        })
        .catch(err => {
            console.log('OrganisationType error.');
            res.status(400).json({msg: 'OrganisationType error.'});
        });
};

const getOrganisationNames = (req, res, db) => {
    const {orgTypeId} = req.body;

    if(!orgTypeId) {
        console.log("Brak id typu organizacji.");
        return res.status(400).json({msg: 'Brak id typu organizacji.'});
    }

    db.select('id', 'name').from('organisations')
        .where('organisationtypeid', '=', orgTypeId)
        .then(data => {
            if (data[0]) {
                console.log("Success.");
                res.json(data);
            } else {
                console.log('OrganisationNames error.');
                res.status(400).json({msg: 'OrganisationNames error.'});
            }
        })
        .catch(err => {
            console.log('OrganisationNames error.');
            res.status(400).json({msg: 'OrganisationNames error.'});
        });
};

const getOrganisationRoles = (req, res, db) => {
    const {orgTypeId} = req.body;

    if(!orgTypeId) {
        console.log("Brak id typu organizacji.");
        return res.status(400).json({msg: 'Brak id typu organizacji.'});
    }

    db.select('id', 'organisationrole').from('organisationroles')
        .where('organisationtypeid', '=', orgTypeId)
        .then(data => {
            if (data[0]) {
                console.log("Success.");
                res.json(data);
            } else {
                console.log('OrganisationRoles error.');
                res.status(400).json({msg: 'OrganisationRoles error.'});
            }
        })
        .catch(err => {
            console.log('OrganisationRoles error.');
            res.status(400).json({msg: 'OrganisationRoles error.'});
        });
};

const getManyFromDataProvider = (req, res, db) => {
    const query = req.query;
    console.log("getManyFromDataProvider, query: " + query.filter.toString());
    if(query.filter !== undefined) {
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
        db.select('*').from('organisations').where(db.raw('id IN ('+querryStringTableOfIds+')'))
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                console.log("err: " + err);
            });
    }
};

function convertCrappyJson(crappyJson) {
    let Hjson = require('hjson');
    return Hjson.parse(crappyJson);
}

module.exports = {
    getOrganisationTypes: getOrganisationTypes,
    getOrganisationNames: getOrganisationNames,
    getOrganisationRoles: getOrganisationRoles,
    getManyFromDataProvider: getManyFromDataProvider,
}