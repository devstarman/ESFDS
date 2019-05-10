const returnPermittedResources = (req, res, db) => {

    const { roleId } = req.body;

    if(!roleId) {
        console.log("Request for resources sent without user roleId.");
        return res.status(400).json({msg: 'Request for resources sent without user roleId.'});
    }

    console.log("Permited resources for user with " + roleId + " roleId are: ");
    if(roleId === '4') {
        console.log('users, wnioski, organisations');
        res.json({resources: 'users, wnioski, organisations'});
    } else if(roleId > 0 && roleId < 6) {
        console.log('wnioski');
        res.json({resources: 'wnioski, organisations'});
    } else {
        console.log('no resources available');
        res.json({resources: ''});
    }
}

module.exports = {
    returnPermittedResources: returnPermittedResources
}