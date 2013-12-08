var Events = {

    socketio: null,

    init: function(socketio) {
        socketio.on("hi", function(data) {
            console.log(data);
        });
        //
        /*socketio.emit("walking.set", {
            name: "Percorso 1",
            description: "Prova inserimento forzoso",
            level: "1"
        });*/
        //

        //
        /*
        socket.on("poi.data", function(data) {
            console.log("Poi data received: " + data);
        })*/
    }

}

var socket = io.connect();

Events.init(socket);
