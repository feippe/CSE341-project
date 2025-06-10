const mongodb = require('./data/database');
const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');



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
                secret: process.env.SESSION_SECRET || 'supersecretkey',
                resave: false,
                saveUninitialized: false,
                store: MongoStore.create({ client: mongodb.getDatabase() })
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
            ;
    }
});