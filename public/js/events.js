var Events = {

    socketio: null,

    init: function(socketio) {
        socketio.on("hi", function(data) {
            console.log(data);
        });
        socketio.emit("walking.set", {
            name: "Percorso 1",
            description: "Prova inserimento forzoso",
            level: "1"
        });
    }

}

var socket = io.connect("//localhost:3000");

Events.init(socket);