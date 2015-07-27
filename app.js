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
    //res.sendFile(__dirname + "/index.html");
    res.sendFile(__dirname + "/index.html");
});

io.sockets.on('connection', function (socket) {
    socket.on('player:add', function (data, callback) {
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

    socket.on('game:create', function (data, callback) {
        if (!(data in games)) {
            socket.game = game.createGame(game.settings);
            socket.game.name = data;
            games[data] = {
                socket: socket,
                game: socket.game
            };
            socket.join(data);
            updateGames();
            addPlayerToGame(data);
            callback(true);
        } else {
            callback(false);
        }
    });

    socket.on('game:join', function (data, callback) {
        if (data in games) {
            socket.join(data);
            addPlayerToGame(data);
            callback(true);
        } else {
            console.log("Couldn't find " + data);
            callback(false);
        }
    });

    socket.on('game:cancel', function (data) {
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

    socket.on('game:start', function (data, callback) {
        if (games[data]) {
            var currentGame = games[data].game;
            //Shuffle all decks
            currentGame.actionCards = game.shuffle(currentGame.actionCards);

            //Pass out cards (1 candidate card, 3 action cards)
            game.dealCards(currentGame, game.settings);

            //Determine playing order
            currentGame.players = game.shuffle(currentGame.players);

            //Update all players in the room
            updateGame(data);

            //Start player 1's turn
            startTurn(data, currentGame.currentPlayerIndex);

            callback(true);
        } else {
            callback(false);
        }


    });

    socket.on('game:endTurn', function (data, callback) {
        if (games[data]) {
            var currentGame = games[data].game;
            currentGame.currentPlayerIndex++;
            if (currentGame.currentPlayerIndex >= currentGame.players.length) {
                currentGame.currentPlayerIndex = 0;
            }
            startTurn(data, currentGame.currentPlayerIndex);
        } else {
            callback(false);
        }
    });




    function cancelGame(data) {
        console.log("Cancel " + data + " game");
        io.to(data).emit("game:cancelled");
        //TODO: Disconnect all players from the room
        /*
        io.sockets.clients(data).forEach(function (s) {
            s.leave(data);
        });
        */
    }

    function updatePlayers() {
        io.sockets.emit("players", Object.keys(players));
    }

    function updateGames() {
        io.sockets.emit("games", Object.keys(games));
    }

    function addPlayerToGame(data) {
        games[data].game.players.push({
            name: socket.player,
            hand: [],
            electorals: [],
            candidate: {}
        });
        updateGame(data);
    }

    function updateGame(data) {
        io.to(data).emit("game:updated", games[data].game);
    }

    function startTurn(data, index) {
        io.to(data).emit("game:startTurn", index);
    }
});