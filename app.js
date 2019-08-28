// server.js: Main Program

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var db         = require('./db');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = 3025;        // set our port

db.connect(function ConnectionHandler(err){
    if (err){
        console.log('Unable to connect to MySQL');
        process.exit(1);
    }
    console.log("Connection to MySQL Successfull");
});

app.get('/index.html', function handleHomePage(request, response) {
    response.sendFile(__dirname + "/" + "index.html");
});


// ROUTES FOR OUR API
// =============================================================================
app.all('/api', function HandleAll(request, response, next){
    console.log(request.connection.remoteAddress);
    next();
});

var filmsRouter = require('./routers/films.js');         // get an instance of the express Router
var categoriesRouter = require('./routers/categories.js');

app.use(express.static('public'));




// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', filmsRouter);
app.use('/api', categoriesRouter);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port: ' + port);
