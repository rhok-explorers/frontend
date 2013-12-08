/*
 * Daniele Brugnara
 * RHOK 2013 - Trento
 */

var Poi = function(client, socket, next) {

    getPoiData = function(data) {
        console.log("Requested poi data: " + data);
        client.get("/poi/" + data.id, function(err, req, res, obj) {
            console.log("Poi data received: %j", obj);
            socket.emit("poi.data", obj);
        });
    }

    socket.on("poi.set", function(data) {
        console.log("Adding a new poi with data: %j", data);
        client.post("/walking/" + data.walkingId, data.poi, function(err, req, res, obj) {
            console.log("Poi added!");
            console.log("%j", obj);
            //
            //socket.emit("poi.data", obj);
            getPoiData(obj);
        })
    });

    socket.on("poi.get", getPoiData);

    next();

}

module.exports = Poi;