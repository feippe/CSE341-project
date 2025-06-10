const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: new ObjectId(id) });
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    const db = mongodb.getDatabase().db();
    const existingUser = await db.collection('users').findOne({ googleId: profile.id });

    if (existingUser) {
        return done(null, existingUser);
    }

    const newUser = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
    };

    const result = await db.collection('users').insertOne(newUser);
    done(null, { ...newUser, _id: result.insertedId });
}));
