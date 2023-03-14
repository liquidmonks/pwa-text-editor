module.exports = async (req, res, next) => {
    const isLogedIn = req.session.isLogedIn;
    if (isLogedIn) {
        return next()
    }

    return res.redirect('/login');
}