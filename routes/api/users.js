const express = require("express");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../../models/User");
const keys = require("../../config/keys");

const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));


// REGISTER NEW USERS
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) res.status(400).json(errors);

    // Check to make sure nobody has already registered with duplicate username
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                // Throw a 400 error if the username already exists
                errors.name = "Username already exists";
                return res.status(400).json(errors);
            } else {
                // Otherwise create a new user
                const newUser = new User({
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const payload = {
                                    id: user.id,
                                    username: user.username
                                }

                                jwt.sign(payload, keys.secretOrKeys, { expiresIn: 3600 }, (err, token) => {
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



// REGISTER NEW USERS
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    
    if (!isValid) res.status(400).json(errors);
    
    const { username, password } = req.body;
    
    User.findOne({ username }).then(user => {
        if (!user) {
            // Throw a 400 error if the username does not exist
            errors.username = 'This user does not exist.';
            return res.status(400).json(errors);
        };

        // VALIDATE PASSWORD
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    const payload = { id: user.id, name: user.name };

                    jsonwebtoken.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });
                } else {
                    errors.password = 'Incorrect password.'
                    return res.status(400).json(errors);
                }
            });
    });
});

module.exports = router;