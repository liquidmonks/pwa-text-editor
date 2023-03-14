module.exports = async (req, res, next) => {
    const isVerified = req.session.isVerified;
    if (isVerified) {
        return next()
    }

    return res.redirect('/verification');
}