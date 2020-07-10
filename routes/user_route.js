const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const usersModel = require('../models/users');

router.post('/register', (req, res, next) => {
    usersModel.findOne({ email: req.body.email }, (err, result) => {
        if (err)
            throw err;
        else if (result){
            // Find a existed email 
            res.send({ err_msg: 'This email is already exists'});
        }else{
            // Do not a exisied email
            // Check the password and the confirm password is match
            if (req.body.password === req.body.confirm_password){
                // Hashing the password
                bcrypt.hash(req.body.password, 10).then((hash) => {
                    // Create a new user model
                    const user = new usersModel({
                        _id: new mongoose.Types.ObjectId,
                        email: req.body.email,
                        username: req.body.username,
                        password: hash
                    });
                    user.save((err) => {
                        if (err){
                            // Check password is valid
                            if (err.errors.password){
                                res.send({ err_msg: 'Please fill in valid password'});
                            }
                            console.log(err.errors);
                            // Check email is valid
                            if (err.errors.email){
                                res.send({ err_msg: 'Please fill in valid email'});
                                console.log(err.errors.email);
                            }
                        }else {
                            res.send({ success_msg: 'Regist Successful'});
                        }
                    });
                });
            } else {
                res.send({ err_msg: 'Your confirmed password is not equal to your password'});
            }
        }
    });
});

router.post('/login', (req, res, next) =>{
    usersModel.findOne({ email: req.body.email }, (err,user) => {
        if (err)
            throw err;
        if (user) {
            // Comparing the login password is/is not vaild 
            bcrypt.compare( req.body.password, user.password, (err,isvaild) => {
                if (err)
                    throw err;
                if (isvaild){
                    // Save the token
                    const token = jsonwebtoken.sign(
                        {userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'});
                    // Session to save user info
                    req.session.user = user.username;
                    req.session.userId = user._id;
                    console.log(req.session.userId);
                    res.status(200).json({
                        userId: req.session.userId,
                        username: req.session.user,
                        token: token
                    });
                }else {
                    res.send({ err_msg: 'Your password is wrong, please input the correct password'})
                }
            });
        }else {
            res.send({ err_msg: 'Your email is not correct, please try another mail to login'})
        }
    });
});

router.get('/logout', (req,res,next) => {
    if (req.session.user){
        delete req.session.user;
        delete req.session.userId;
        res.redirect('/');
    }
});

router.get('/islogin', (req,res,next) => {
    // Checking have/have not session ( user is/is not login)
    if (req.session.user){
        res.send(req.session.user);
    }else{
        res.send('');
    }
});

router.get('/userprofile', (req,res) => {
    // Find user by session and get the user info
    usersModel.findOne({ _id: req.session.userId }).exec((err, user) => {
        if (err)
            throw err;
        else
            res.send(user);
    });
});

router.put('/changepassword', (req, res) => {
    var new_password = req.body.new_password;
    // Compare the new password and the new confirm password
    if (new_password === req.body.confirm_password){
        // Hashing the new password
        bcrypt.hash(new_password, 10).then(function(newhash) {
            var new_hash_password = {password: newhash};
            // Update the new password into the database
            usersModel.updateOne({ _id: req.session.userId }, new_hash_password, function(err,result) {
                if (err)
                    throw err;
                if (result.ok === 1){
                    res.send({ success_msg: 'Your password is change' });
                }else{
                    res.send({ err_msg: 'Sorry, there are some problem you cannot update the password, please try again'});
                }
            })
        });
    }else{
        res.send({ err_msg: 'Your confirm password is not correct, please equal to your new password'});
    }
});

module.exports = router;