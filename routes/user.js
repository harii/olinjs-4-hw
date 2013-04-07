var User = require('../models/user');

exports.login = function(req, res) {
    res.render('login', {title:"Login!"});
}

exports.createProfile = function(req, res) {

    User
    .findOne({name:req.body.username})
    .exec(function(err, existingName){
        if(err) console.log("ERROR: finding username");
        else {
            if (existingName==null) addUserIfNew(req, res);
            else {
                console.log("Welcome back,"+req.body.username+"!");
                req.session.user = existingName;
                console.log("EXISTING NAME", req.session.user._id);
                res.redirect("/");
            }
        }
    });
}


function addUserIfNew(req, res) {
    console.log("NEW USER!!");

    var newUser = new User({
        name: req.body.username
        // the tweets field is allowed to be left empty: schema has reference to user's tweets
    });

    newUser.save(function(err){
        if (err) console.log("ERROR: saving new user in db");
        else {
            req.session.user = newUser;
            res.redirect("/");
        }
    });
}