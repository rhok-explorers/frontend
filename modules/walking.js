/*
 * Daniele Brugnara
 * RHOK 2013 - Trento
 */

var Walking = function(client, socket, next) {

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
        });
    });
    //
    socket.on("walking.get", function(data) {
        if (data.id) {
            client.get("/walking/" + data.id, function(err, req, res, obj) {
                console.log("Received walking (one)");
                console.log("%j", obj);
            });
        } else {
            /*
            client.get("/walking/center/" data.coord.lat, function(err, req, res, obj) {
                console.log("Received walkings (many)");
                console.log("%j", obj);
            });*/
        }
    })

    next();

}

module.exports = Walking;