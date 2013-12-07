/*
 * Daniele Brugnara
 * RHOK 2013 - Trento
 */

var Poi = function(client, socket, next) {

    socket.on("poi.set", function(data) {
        console.log("Adding a new poi with data: " + data);
        client.post("/poi/" + data.walkingId, data.poi, function(err, req, res, obj) {
            console.log("Poi added!");
            console.log("%j", obj);
            //
            socket.emit("poi.data", obj);
        })
    });

    next();

}

module.exports = Poi;