/*
 * Daniele Brugnara
 * RHOK 2013 - Trento
 */

var express = require('express')
    , http = require('http')
    , socketio = require('socket.io')
    , path = require('path')
    , RestClient = require("./modules/restClient")
    , Walking = require("./modules/walking")
    , User = require("./modules/user")
    , Poi = require("./modules/poi")
;

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

var io = socketio.listen(app.listen(app.get('port') , function() {
    console.log("Express server listening on port " + app.get("port"));
}));

io.set('log level', 1);

io.sockets.on('connection', function(socket) {
    console.log("User connected");
    //
    socket.emit("hi", {ciao: "mondo"});
    client = new RestClient(socket, function(client) {
        walking = new Walking(client, socket, function() {
            console.log("Walking setted");
        });
        //
        user = new User(client, socket, function() {
            console.log("User setted!");
        })
        //
        poi = new Poi(client, socket, function() {
            console.log("Poi structure setted");
        })
    });
});
