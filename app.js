
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , tweets = require('./routes/tweets')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(express.cookieParser(process.env.SECRET || 'fake secret'));
  app.use(express.session());
  app.use(app.router);

  app.use(express.static(path.join(__dirname, 'public')));
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
  });

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', tweets.displayTweets);
app.get('/users/new', user.login);
app.post('/users/new', user.createProfile);
app.post('/tweets/:user', tweets.addNewTweet);
app.post('/', tweets.addLatestTweets);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
