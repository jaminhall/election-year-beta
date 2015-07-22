var socket,
    player,
    playerName,
    playerNameInput,
    playerNameError,
    playerForm,
    playersOnline,
    createGameButton,
    startGameButton,
    cancelGameButton,
    welcomeScreen,
    game,
    gameScreen,
    availableGames,
    lobbyScreen,
    notification;

jQuery(function ($) {
    init();
    displayScreen(welcomeScreen);
    addSocketHandlers();
    addFormHandlers();
});


function init() {
    socket = io.connect();
    player = {};
    gameView = {
        playerList: $('#players'),
        hostName: $('.hostName')
    };
    playerName = $('.playerName');
    playersOnline = $('#playersOnline');
    playerNameInput = $('#playerNameInput');
    playerNameError = $('#playerNameError');
    playerForm = $('#addPlayer');
    createGameButton = $('#createGame');
    startGameButton = $('#startGame');
    availableGames = $('#availableGames');
    cancelGameButton = $('#cancelGame');
    //SCREENS
    welcomeScreen = $('#welcome');
    lobbyScreen = $('#lobby');
    gameScreen = $('#game');
    
    notification = $('#notification');
}

function addSocketHandlers() {
    socket.on('players', function (data) {
        updateAvailablePlayers(data);
    });
    socket.on('games', function (data) {
        updateAvailableGames(data);
    });
    socket.on('playerAddedToGame', function (game) {
        updateGame(game);
    });
    socket.on('cancelGame', function () {
        cancelGame();
    });
}

function addFormHandlers() {
    playerForm.submit(function (e) {
        e.preventDefault();
        socket.emit('new player', playerNameInput.val(), function (data) {
            if (data) {
                player.name = playerNameInput.val();
                playerName.text(player.name);
                displayScreen(lobbyScreen);
                playerNameInput.val("");
            } else {
                playerNameError.text("Uh oh. Some one is already using that name.");
            }
        });
    });

    createGameButton.click(function (event) {
        socket.emit('new game', player.name, function (data) {
            if (data) {
                displayScreen(gameScreen);
                startGameButton.show();
            }
        });

    });

    startGameButton.click(function (event) {
        socket.emit('start game', player.name,
            function (data) {

            });
    });
    
    cancelGameButton.click(function (event) {
        socket.emit('cancel game', player.name, function (data) {
            
        });
    });
    

    availableGames.on("click", "input", function (event) {
        var gameName = $(event.currentTarget).attr("data-playerName");
        socket.emit('join game', gameName, function (success) {
            if (success) {
                displayScreen(gameScreen);
            }
        });
    });
}

function updateAvailablePlayers(players) {
    var playerItem;
    playersOnline.html("");
    for (var i = 0; i < players.length; i++) {
        playerItem = "<li>" + players[i] + ((players[i] == player.name) ? " (you)" : "") + "</li>";
        playersOnline.append(playerItem);
    }
}

function updateAvailableGames(games) {
    var gameItem;
    availableGames.html("");
    for (var i = 0; i < games.length; i++) {
        gameItem = "<li>" + games[i] + "'s game <input type='button' value='Join' data-playerName='" + games[i] + "'></input></li>";
        availableGames.append(gameItem);
    }
}

function updateGame(game) {
    console.log(game);
    var playerItem;
    gameView.playerList.html("");
    for (var i = 0; i < game.players.length; i++) {
        playerItem = "<li>" + game.players[i] + ((game.players[i] == player.name) ? " (you)" : "") + "</li>";
        gameView.playerList.append(playerItem);
    }
    gameView.hostName.html(game.players[0]);
}

function cancelGame() {
    displayScreen(lobbyScreen);
    notification.html(":( Your game was cancelled.");
    notification.fadeIn();
}

function displayScreen(screen) {
    $('.screen').hide();
    screen.show();
}