/*
 * Daniele Brugnara
 * RHOK 2013 - Trento
 */

var Walking = function(client, socket, next) {

    var getWalkingData = function(data) {
        console.log("Getting walking data with params: %j", data);
        if (data.id) {
            client.get("/walking/" + data.id, function(err, req, res, obj) {
                console.log("Received walking (one)");
                console.log("%j", obj);
                socket.emit("walking.data", [obj]);
            });
        } else {
            /*
             client.get("/walking/center/" data.coord.lat, function(err, req, res, obj) {
             console.log("Received walkings (many)");
             console.log("%j", obj);
             });*/
        }
    };

    console.log("Initializing walking api...");
    socket.on("walking.set", function(data) {
        console.log("Setting new walking...");
        console.log(data);
        //
        client.post("/walking", data, function(err, req, res, obj) {
            if (err) {
                console.log(err.message);
            }
            console.log("New walking!");
            console.log("%j", obj);
            //
            getWalkingData(obj);
        });
    });
    //
    socket.on("walking.get", getWalkingData)

    next();

}

module.exports = Walking;