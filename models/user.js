var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    name: String,
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }]
});

var User = mongoose.model('User', userSchema);
module.exports = User;