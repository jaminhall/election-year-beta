var express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server),
    players = {},
    games = {},
    port = process.env.PORT || 5000,
    game = require("./game");

app.use(express.static('public'));

server.listen(port);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.sockets.on('connection', function (socket) {
            socket.on('new player', function (data, callback) {
                if (!(data in players)) {
                    callback(true);
                    socket.player = data;
                    players[socket.player] = socket;
                    updatePlayers();
                    updateGames();
                } else {
                    callback(false);
                }
            });

            socket.on('new game', function (data, callback) {
                if (!(data in games)) {
                    callback(true);
                    socket.game = Object.create(game);
                    socket.game.name = data;
                    socket.game.players = [];
                    socket.game.settings = game.settings;

                    games[data] = {
                        socket: socket,
                        game: socket.game
                    };
                    socket.join(data);
                    updateGames();
                    addPlayerToGame(data);
                } else {
                    callback(false);
                }
            });

            socket.on('join game', function (data, callback) {
                if (data in games) {
                    socket.join(data);
                    addPlayerToGame(data);
                    callback(true);
                } else {
                    console.log("Couldn't find " + data);
                    callback(false);
                }
            });

            socket.on('cancel game', function (data) {
                    if (games[data]) {
                        cancelGame(data);
                        delete games[data];
                    }
                });

                socket.on("disconnect", function (data) {
                    if (!socket.player) return;
                    delete players[socket.player];
                    if (games[socket.player]) {
                        cancelGame(socket.player);
                    }
                    delete games[socket.player];
                    updatePlayers();
                    updateGames();
                });

                socket.on('start game', function (data) {
                    //Shuffle all decks
                    //Pass out cards (1 candidate card, 3 action cards)
                    //Determine playing order
                    //Update all players in the room
                    //Start player 1's turn
                });

                function cancelGame(data) {
                    console.log("Cancel " + data + " game");
                    io.to(data).emit("cancelGame");
                   //Disconnect all players from the room
                    io.sockets.clients(data).forEach(function (s) {
                        s.leave(data);
                    });
                }

                function updatePlayers() {
                    io.sockets.emit("players", Object.keys(players));
                }

                function updateGames() {
                    io.sockets.emit("games", Object.keys(games));
                }

                function addPlayerToGame(data) {
                    games[data].game.players.push(socket.player);
                    //console.log("*******************");
                    //console.log(games[data].game);
                    //console.log("*******************");
                    io.to(data).emit("playerAddedToGame", games[data].game);
                }
            });