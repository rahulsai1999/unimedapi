var router=require("express").Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var Patient = require('../models/patient');
var shortid=require("shortid");

var secret = '7x0jhxt"9(thpX6';

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ error: 'Invalid credentials.' });
      }
      if (user) {
        var token = jwt.sign({ id: user._id, username: user.username }, secret);
        return res.json({ token });
      }
    })(req, res, next);
  });
  
router.post('/register', function (req, res) {
    Patient.register(new Patient(
      { _id:shortid.generate().slice(0,7),
        name:req.body.name,
        DOB:req.body.dob,
        username:req.body.username,
        email:req.body.email,
        gender:req.body.gender,
        height:req.body.height,
        weight:req.body.weight,
        bldgrp:req.body.bloodgrp}), req.body.password, function (err, user) {
      if (err) {
        return res.status(400).send({ error: 'Email address in use.' })
      }
      res.json(user);
    });
  });
  
  module.exports = router;
  
