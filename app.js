
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , restaurant = require('./routes/restaurant.js')
  , mongoose = require('mongoose');

var app = express();

var connStr = 'mongodb://localhost/eoidhue';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/restaurants/',restaurant.index);
app.get('/restaurants/create',restaurant.new);
app.post('/restaurants/create',restaurant.create);
app.get('/restaurants/:id/edit',restaurant.edit);
app.post('/restaurants/:id/edit',restaurant.update);
app.post('/restaurants/:id/delete',restaurant.delete);
app.get('/restaurants/:id/addfeedback/:like',restaurant.addFeedBack);



app.get('/:place/')

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
