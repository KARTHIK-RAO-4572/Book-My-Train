var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(username, password, done) {
        return done(null,user);
    }
   ));