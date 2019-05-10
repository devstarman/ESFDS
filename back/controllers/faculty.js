const getFaculties = (req, res, db) => {
    db.select('id', 'name').from('faculties')
        .then(data => {
            if(data[0]) {
                console.log("organisation 1: " + data[0].id);
                res.json(data);
            } else {
                console.log('Faculties list error.');
                res.status(400).json({msg: 'Faculties list error.'});
            }
        })
        .catch(err => {
            console.log('Faculties list error.');
            res.status(400).json({msg: 'Faculties list error.'});
        });
};

module.exports = {
    getFaculties: getFaculties,
}