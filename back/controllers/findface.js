const handleFindface = (req, res) => {
    database.users.forEach(user => {
        if (user.email === req.body.email) {
            user.entries++
            res.json(user)
        }
    });
    res.json('nope')
}

module.exports = {
    handleFindface: handleFindface
}