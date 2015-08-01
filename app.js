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

    socket.on('player:move', function (position, callback) {
        var currentGame = games[position.game].game;

        for (var i = 0; i < currentGame.players.length; i++) {
            if (currentGame.players[i].name == position.playerName) {
                currentGame.players[i].x = position.x + (i * 5);
                currentGame.players[i].y = position.y;
                currentGame.players[i].currentRegion = position.region;
                updateGame(position.game);
                break;
            }
        }
    });

    socket.on('game:create', function (data, callback) {
        if (!(data in games)) {
            socket.game = game.createGame(game.settings);
            socket.game.name = data;
            games[data] = {
                socket: socket,
                game: socket.game,
                sockets: [socket]
            };
            socket.join(data);
            updateGames();
            addPlayerToGame(data);
            sendBotMessage(data, socket.player + " created this game.");
            callback(true);
        } else {
            callback(false);
        }
    });

    socket.on('game:join', function (data, callback) {
        if (data in games) {
            socket.game = {
                name: data
            }
            games[data].sockets.push(socket);
            socket.join(data);
            addPlayerToGame(data);
            sendBotMessage(data, socket.player + " joined the game.");
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
        if (socket.game && socket.game.name && games[socket.game.name]) {
            var currentGame = games[socket.game.name].game;
            game.removePlayer(currentGame, socket.player);
            updateGame(socket.game.name);
            sendBotMessage(socket.game.name, socket.player + " disconnected");
        }
        delete players[socket.player];
        if (games[socket.player]) {
            cancelGame(socket.player);
        }
        delete games[socket.player];
        updatePlayers();
        updateGames();
    });

    /*socket.on("game:quit", function (data) {
        if (!socket.player) return;
        if (socket.game && socket.game.name && games[socket.game.name]) {
            var currentGame = games[socket.game.name].game;
            game.removePlayer(currentGame, socket.player);
            updateGame(socket.game.name);
            sendBotMessage(socket.game.name, socket.player + " disconnected");
        }
    }*/

    socket.on('game:start', function (data, callback) {
        if (games[data]) {
            var currentGame = games[data].game;
            //Shuffle all decks
            currentGame.actionCards = game.shuffle(currentGame.actionCards);
            currentGame.regionCards = game.shuffle(currentGame.regionCards);
            currentGame.candidateCards = game.shuffle(currentGame.candidateCards);

            //Pass out cards (1 candidate card, 3 action cards)
            game.setup(currentGame, game.settings);

            //Determine playing order
            currentGame.players = game.shuffle(currentGame.players);

            //Update all players in the room
            //updateGame(data);

            io.to(data).emit("game:started");

            //Start player 1's turn
            startTurn(data, currentGame.currentPlayerIndex);

            sendBotMessage(data, "Your game has started. Good luck. " + currentGame.players[0].name + " you're up.");

            callback(true);
        } else {
            callback(false);
        }


    });

    socket.on('game:playCard', function (data, callback) {
        console.log("Playing card " + data.card.name);
        var currentGame = games[data.game].game;
        if (game.playCard(currentGame, data.player, game.settings, data.card.name)) {
            callback(true);
            sendBotMessage(data.game, data.player.name + " played " + data.card.name + ".");
            if (game.checkGameOver(currentGame)) {
                sendBotMessage(data.game, "Game Over");
            };

            updateGame(data.game);
        } else {
            callback(false);
            sendBotMessage(data.game, data.player.name + " tried to play " + data.card.name + ", but couldn't.");
        };

        //console.log(data.card);
    });

    socket.on('game:endTurn', function (data, callback) {
        if (games[data]) {
            var currentGame = games[data].game;
            currentGame.currentPlayerIndex++;
            if (currentGame.currentPlayerIndex >= currentGame.players.length) {
                currentGame.currentPlayerIndex = 0;
            }

            startTurn(data, currentGame.currentPlayerIndex);
            sendBotMessage(data, currentGame.players[currentGame.currentPlayerIndex].name + " it's your turn.");
        } else {
            callback(false);
        }
    });

    socket.on('game:setTravelMethod', function (data, callback) {
        if (games[data.gameName]) {
            var currentGame = games[data.gameName].game;
            sendBotMessage(data.gameName, currentGame.players[currentGame.currentPlayerIndex].name + " is going to " + data.travelMethod + ".");
            callback(true);
        } else {
            callback(false);
        }

    });

    socket.on('message:send', function (message) {
        if (games[message.game]) {
            io.to(message.game).emit('message:received', message);
        }
    });

    function sendBotMessage(group, message) {
        io.to(group).emit('message:received', {
            sender: "EYB Bot",
            date: Date.now(),
            body: message
        });
    }

    function cancelGame(data) {
        console.log("Cancel " + data + " game");
        io.to(data).emit("game:cancelled");
        //TODO: Disconnect all players from the room

        games[data].sockets.forEach(function (s) {
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
        var currentGame = games[data].game;
        currentGame.players[index].airTravel = currentGame.defaultAirTravel;
        currentGame.players[index].roadTravel = currentGame.defaultRoadTravel;
        updateGame(data);
        io.to(data).emit("game:startTurn", index);
    }
});