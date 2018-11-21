const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const getSecret = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: 'This is the users route' }));

// PRIVATE AUTH ROUTE
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        firstName: req.user.firstName,
        lastName: req.user.lastName
    });
})

// REGISTER NEW USERS
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) res.status(400).json(errors);

    // check to make sure nobody has already registered with duplicate username
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                // throw a 400 error if the username already exists
                errors.name = "Username already exists";
                return res.status(400).json(errors);
            } else {
                // otherwise create a new user
                const { username, firstName, lastName, password } = req.body;
                const newUser = new User({
                    username, firstName, lastName, password
                });

                // ENCRYPT PASSWORD
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const payload = {
                                    id: user.id,
                                    username: user.username
                                };

                                jwt.sign(payload, getSecret('secretOrKeys'), { expiresIn: 3600 }, (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                });
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});



// LOGIN EXISTING USERS
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) res.status(400).json(errors);
    
    const { username, password } = req.body;
    
    User.findOne({ username }).then(user => {
        if (!user) {
            // throw a 400 error if the username does not exist
            errors.username = 'This user does not exist.';
            return res.status(400).json(errors);
        };

        // VALIDATE PASSWORD
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    const payload = { id: user.id, name: user.name };

                    jwt.sign(
                      payload,
                      getSecret("secretOrKey"),
                      { expiresIn: 3600 },
                      (err, token) => {
                        res.json({
                          success: true,
                          token: "Bearer " + token
                        });
                      }
                    );
                } else {
                    errors.password = 'Incorrect password.'
                    return res.status(400).json(errors);
                }
            });
    });
});

module.exports = router;