var express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server),
    players = {},
    games = {};

app.use(express.static('public'));

server.listen(5000);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.sockets.on('connection', function (socket) {
    
    socket.on('new player', function (data, callback) {
        if (!(data in players)){
            callback(true);
            socket.player = data;
            players[socket.player] = socket;
            updatePlayers();
            updateGames();
        }
        else {
            callback(false);
        }
    });

    socket.on('new game', function (data, callback) {
        if (!(data in games)) {
            console.log("Creating a new game: " + data);
            callback(true);
            socket.game = data;
            games[socket.game] = {
                socket: socket,
                players: []
            };
            socket.join(data);
            updateGames();
            addPlayerToGame(data);
        }
        else {
            callback(false);
        }
    });
    
    socket.on('join game', function(data, callback) {
        console.log(games);
       if (data in games) {
           socket.join(data);
           addPlayerToGame(data);
           callback(true);
       }
        else {
            console.log("Couldn't find " + data);
            callback(false);
        }
    });
    
    socket.on("disconnect", function(data) {
        if(!socket.player) return;
        delete players[socket.player];
        delete games[socket.player];
        updatePlayers();
        updateGames();
    });
    
    function updatePlayers() {
    io.sockets.emit("players", Object.keys(players)); 
}

function updateGames() {
    io.sockets.emit("games", Object.keys(games));
    }

    function addPlayerToGame(data) {
        games[data].players.push(socket.player);
        io.to(data).emit("playerAddedToGame", games[data].players);
    }
});

