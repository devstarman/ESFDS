const getManyFromDataProvider = (req, res, db) => {
    const query = req.query;
    //console.log("[organisationroles] getManyFromDataProvider, query: " + query.filter.toString());
    if(query.filter !== undefined) {
        console.log("query filter organisationroles");
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
        db.select('*').from('organisationroles').where(db.raw('id IN ('+querryStringTableOfIds+')'))
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                console.log("err: " + err);
            });
    } else {
        console.log("query: " + query.toString());
        db.select('*').from('organisationroles').then(organisationroles => {
            if(organisationroles.length) {
                console.log("organisationroles get - length = " + organisationroles.length);
                console.log("header: " + "organisationroles 0-" + organisationroles.length + "/" + Math.ceil(organisationroles.length/10));
                res.setHeader("Content-Range", "organisationroles 0-" + organisationroles.length + "/" + Math.ceil(organisationroles.length/10));
                res.setHeader("Access-Control-Expose-Headers", "Content-Range");
                console.log("returning organistationroles: " + JSON.stringify(organisationroles));
                res.json(organisationroles);
            } else {
                res.status(400).json('Not found!');
            }
        }).catch(err => res.status(400).json('Error getting organisationroles'));
    }
};

const getOrganisationRolesForUserId = async (req,res,db) => {
    const {id} = req.params;
    console.log("getOrganisationRolesForUserId: " + id);
    let orgId = await getUserOrgId(id, db);
    console.log("orgId: " + orgId);
    let orgTypeId = await getUserOrgTypeId(orgId, db);
    console.log("orgTypeId: " + orgTypeId);
    db.select('*').from('organisationroles').where("organisationtypeid","=",orgTypeId).then(organisationroles => {
        if(organisationroles.length) {
            res.setHeader("Content-Range", "organisationroles 0-" + organisationroles.length + "/" + Math.ceil(organisationroles.length/10));
            res.setHeader("Access-Control-Expose-Headers", "Content-Range");
            res.json(organisationroles);
        } else {
            res.status(400).json('Not found!');
        }
    }).catch(err => res.status(400).json('Error getting organisationroles'));
};

const getUserOrgId = async (id,db) => {
    let result = 0;
    await db.select('organisationid').from('users').where('id','=',id)
          .then((orgids) => {
             result = orgids[0].organisationid;
          });
    return result;
};

const getUserOrgTypeId = async (orgId,db) => {
    let result = 0;
    await db.select('organisationtypeid').from('organisations').where('id','=',orgId)
        .then((typeids) => {
            result = typeids[0].organisationtypeid;
        });
    return result;
};

function convertCrappyJson(crappyJson) {
    let Hjson = require('hjson');
    return Hjson.parse(crappyJson);
}

module.exports = {
    getManyFromDataProvider: getManyFromDataProvider,
    getOrganisationRolesForUserId: getOrganisationRolesForUserId,
};