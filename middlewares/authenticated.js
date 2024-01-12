module.exports = async (req, res, next) => {
    const {isLoggedIn} = req.session;
    if (isLoggedIn === true) {
        return next();
    }

    return res.redirect('/login');
}