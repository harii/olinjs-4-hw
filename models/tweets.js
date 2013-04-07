var mongoose = require("mongoose");

var tweetSchema = mongoose.Schema({
    message: String,
    created: Date,
    ownerRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

var Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;