const mongodb = require('./data/database');
const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const cors = require('cors');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

const port = process.env.PORT || 3000;

require('./auth/passport.js');

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => { console.log(`Database is listening and node running on port ${port}`); });
        app
            .use(session({
                secret: process.env.SESSION_SECRET || 'idontknow',
                resave: false,
                saveUninitialized: false,
                store: MongoStore.create({ client: mongodb.getDatabase() }),
                cookie: {
                    secure: isProduction,
                    sameSite: isProduction ? 'none' : 'lax'
                }
            }))
            .use(passport.initialize())
            .use(passport.session())
            .use(bodyParser.json())
            .use((req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader(
                    'Access-Control-Allow-Headers',
                    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
                );
                res.setHeader(
                    'Access-Control-Allow-Methods',
                    'GET, POST, PUT, DELETE, OPTIONS'
                );
                next();
            })
            .use('/', require('./routes'))
            .use(cors({
                origin: isProduction
                    ? 'https://songs-5tbl.onrender.com'
                    : 'http://localhost:3000',
                credentials: true
            }))
            ;
        if (isProduction) {
            app.enable('trust proxy');
        }
    }
});