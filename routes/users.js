var express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var passport = require('passport');
var router = express.Router();
var passport = require('passport');

require('../models/index');
const Diet = mongoose.model('diets');
const User = mongoose.model('users');

const Attribute = mongoose.model('attributes');

router.route('/login')
    .get((req, res) => {
        res.send('Login Page')

    })
    .post((req, res) => {
        // console.log("Req recieved at back",req.body)

        // )
        User.findOne({
            email: req.body.email
        }).then(user => {
            if (!user) {
                res.send("No user found")
            } else {
                bcrypt.compare(user.password, req.body.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        res.send('userFound', user)
                        console.log('User found consoled from back')
                    } else {
                        res.send('Password incorrect')
                    }
                })

            }
        })

        
    })
        
       
        //write authentication ..
        //check if user has attributes field filled
        //if not redirect to users/attribute
        //else dashboard

router.get('/dashboard', (req, res) => {
    User.findOne({
            _id: "5c55ab70e63e60aefd8ccc43"
        })
        .then((user) => {
            console.log(user.dietId)

            Diet.findOne({
                    _id: user.dietId
                })
                .then((diet) => {
                    console.log(diet.meals)
                })
        })
    res.send('got user')
})

//view full diet 


router.get('/logout', (req, res) => {
    req.logOut();
    res.send('logged out')
})
router.route('/register')
    .get((req, res) => {
        res.send('register page');
    })
    .post((req, res) => {
        //register the user
        let errors = [];
        if (req.body.password.length != req.body.password2.length) {
            errors.push({
                text: "Password does not matches"
            })
        } else if (req.body.password != req.body.password2) {
            errors.push({
                text: "Password does not matches"
            })
        }
        if (errors.length > 0) {
            console.log(errors)
            res.render('users/register', {
                errors: errors,
                name: req.body.name,
                email: req.body.email
            })
        } else {
            User.findOne({
                    email: req.body.email
                })
                .then(user => {
                    if (user) {
                        req.flash('error_msg', 'Email already registered');
                        res.redirect('/users/register');
                    } else {
                        const newUser = {
                            username: req.body.username,
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                        }
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(newUser.password, salt, function (err, hash) {
                                if (err) throw err;
                                newUser.password = hash;
                                new User(newUser)
                                    .save()
                                    .then(user => {
                                        req.flash('success_msg', "Congratulation, You can now Login")
                                        res.redirect('/users/login')
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            });
                        });

                    }
                })
        }

    })
router.route('/attributes')
    .get((req, res) => {
        res.send(' Attributes form page');
    })
    .post((req, res) => {
        const newAttribute = new Attribute({
            gender: req.body.gender,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,

        })
        //calculate BMI and store it in db attribute of user
        //calculate calorie using formula store it 
        //Next, Browse recommended plans for the user according to colories required
    })


module.exports = router;