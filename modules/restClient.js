/*
 * Daniele Brugnara
 * RHOK 2013 - Trento
 */

var restify = require("restify");

var RestClient = function(socket, next) {

    this.socket = socket;
    //
    this.init(next);

}

RestClient.prototype.init = function(next) {
    console.log("Initializing restClient...");
    this.client = restify.createJsonClient({
        url: "http://littleexplorers.herokuapp.com",
        version: "*"
    });
    //
    next(this.client);
}

module.exports = RestClient;