const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User')
const getSecret = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = getSecret("secretOrKey");

module.exports = passport => {
    passport.use(new JwtStrategy(options, (payload, done) => {
        User.findById(jwt_payload.id).then(
            user => {
                if (user) {
                    // return user to frontend
                    return done(null, user);
                }

                // return false since there is no user
                return done(null, false);
            })
            .catch(err => console.log(err));
        }));
};