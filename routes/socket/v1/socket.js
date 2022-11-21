const { Server } = require("socket.io");
let _io;
let clients = 0;

const init = server => {
    console.log("init socket")
    _io  = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    _io.on('connection', function (socket) {
        clients++;
        console.log(`User ${socket.id} disconnect`);
        _io.emit('broadcast',{ description: clients + ' clients connected!'});

        socket.on('disconnect', function () {
            clients--;
            console.log(`User ${socket.id} disconnect`);
            _io.emit('broadcast',{ description: clients + ' clients connected!'});
        });
    });
}

const io = () => {
    if(!_io) {
        throw new Error("io kosong");
    }

    return _io;
}

module.exports = {
    init,
    io
}