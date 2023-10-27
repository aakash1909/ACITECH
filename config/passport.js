const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Configure local strategy for login
passport.use(new LocalStrategy(User.authenticate()));



module.exports = passport;
