/*
 * Daniele Brugnara 
 * RHOK 2013 - Trento
 */

var User = function(client, socket, next) {

    socket.on("user.login", function(data) {
        console.log("Logging user...");
        client.post("/user/login", function(err, req, res, obj) {
            if (err) {
                console.error(err.message);
            } else {
                console.log("User logged in!");
                console.log("%j", obj);
            }
        })
    });

    next();

}

module.exports = User;