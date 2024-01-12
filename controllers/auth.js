const router = require('express').Router()
const Service = require('../models/Services')

router.post('/verification', async (req, res) => {
    try {
        const { code } = req.body;

        const exist = await Service.findOne({ where: { authenticationCode: code } });

        if (exist) {
            req.session.isVerified = true;
            req.session.verificationId = exist.id;
            return res.status(200).json({ message: 'success' })
        }

        res.status(401).json({ message: "Invalid authentication code" });

    } catch (error) {
        res.status(400).json({ message: 'Something went wrong, try again later' });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        const exist = await Service.findByPk(req.session.verificationId, { attributes: ['url'] });

        const urlParams = new URLSearchParams(exist.url.slice(exist.url.indexOf('?') + 1));
        const storedUsername = urlParams.get('username');
        const storedPassword = urlParams.get('password');

        if (storedUsername === username && storedPassword === password) {
            req.session.isLogedIn = true
            return res.status(200).json({ message: 'success' })
        }

        res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong, try again later' })
    }
})


router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})


module.exports = router