require('dotenv').config();

const express = require('express')
const handlebars = require('express-handlebars')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./db');
const path = require('path');
const verified = require('./middlewares/verified');
const helpers = require('./helpers')
const cron = require('node-cron');
const { updateServices } = require('./controllers/service');
const { query } = require('./db/xuidb')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secrctekeyfhrgfgrfrty84fwir767',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
}));


const hbs = handlebars.create({ helpers })
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')



app.use(express.static(path.join(__dirname, 'public')));



app.get('/', verified, (req, res) => {
    res.render('main')
})

app.get('/login', verified, (req, res) => {
    res.render('auth/login')
})

app.get('/verification', (req, res) => {
    res.render('auth/verification')
})

app.get('/updatefiles', async (req, res) => {
})

app.use('/auth', require('./controllers/auth'))
app.use('/search', require('./controllers/search'))



// Schedule a task to run every 6 hours
cron.schedule('0 */6 * * *', () => {
    console.log('Running task...');
    updateServices()
});
// updateServices()

const PORT = process.env.PORT || 5001
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`App running at port ${PORT}`))
    });


