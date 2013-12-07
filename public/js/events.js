var Events = {

    socketio: null,

    init: function(socketio) {
        socketio.on("hi", function(data) {
            console.log(data);
        });
        //
        socketio.emit("walking.set", {
            name: "Percorso 1",
            description: "Prova inserimento forzoso",
            level: "1"
        });
        //
        socket.on("walking.data", function(walkings) {
            _.forEach(walkings, function(walking) {
                console.log(walking);
            });
        })
        //
        socket.on("poi.data", function(poi) {
            console.log("Poi data received: " + data);
        })
    }

}

var socket = io.connect("//localhost:3000");

Events.init(socket);