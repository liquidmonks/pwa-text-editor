module.exports = async (req, res, next) => {
    const {isVerified} = req.session;
    if (isVerified === true) {
        return next();
    }

    return res.redirect('/verification');
}