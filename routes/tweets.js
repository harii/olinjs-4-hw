var User = require('../models/user');
var Tweet = require('../models/tweets');


exports.addLatestTweets = function(req, res){
    if(req.session.user==undefined) {
        res.redirect("/users/new");
    }
    console.log("Pulling latest tweets from DB!");

    // need to have a query to check for newest tweets
    Tweet.find().sort("-created").populate("ownerRef").limit(1).exec(
        function(err, tweets){
            if(err) console.log("ERROR: Retrieving tweets for listing");
            else {
                res.render('_twitPartial', {title: req.session.user.name, user:req.session.user, tweets: tweets});
            }
        }
    )

}


exports.displayTweets = function(req, res){
    if(req.session.user==undefined) {
        res.redirect("/users/new");
    }
    else {

        // populate the tweets
        // render the page

        Tweet.find().sort("-created").populate("ownerRef").limit(10).exec(
            function(err, tweets){
                if(err) console.log("ERROR: Retrieving tweets for listing");
                else {
                    res.render('twits', {title: req.session.user.name, user:req.session.user, tweets: tweets});
                }
            }
        )
    }
}


exports.addNewTweet = function(req, res) {

    // when the user adds a new tweet,
    // we should create a new tweet object,
    // where that tweet object would contain:
    //      1) the contents of the tweet
    //      2) a MongoDB "reference" to the associated user model
    console.log("Adding new tweet! - not yet..");

    var newTweet = new Tweet({
        message: req.body.tweetContents,
        created: new Date(),
        ownerRef: req.session.user._id
    });

    newTweet.save(function(err){
        if (err) console.log("ERROR: Saving new tweet");
        else{
            res.render("twits", {title:req.session.user.name, tweets:[newTweet]});
        }
    });
}

