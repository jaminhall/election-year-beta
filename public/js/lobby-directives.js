(function () {
    var app = angular.module("lobby-directives", []);

    app.directive("welcome", function () {
        return {
            restrict: "E",
            templateUrl: "templates/welcome.html",
            scope: {
                currentPlayer: "=",
            },
            controller: function ($scope, socket) {
                $scope.attemptLogin = function () {
                    socket.emit('player:add', $scope.currentPlayer.name, function (success) {
                        if (success) {
                            $scope.currentPlayer.loggedIn = true;
                        } else {
                            $scope.currentPlayer.name = "";
                            alert("Some already has that name, fool!");
                        }
                    });
                };
            }
        };
    });

    app.directive("lobby", function () {
        return {
            restrict: "E",
            templateUrl: "templates/lobby.html",
            scope: {
                currentPlayer: "=",
                players: "="
            },
            controller: function ($scope, socket) {
                $scope.createGame = function () {
                    socket.emit('game:create', $scope.currentPlayer.name, function (success) {
                        if (success) {
                            $scope.currentPlayer.inGame = true;
                        } else {
                            alert("Um. There was a problem creating your game.");
                        }
                    });
                };
                $scope.joinGame = function(id) {
                   socket.emit('game:join', id, function (success) {
                        if (success) {
                            $scope.currentPlayer.inGame = true;
                        } else {
                            alert("Um. There was a problem joining that game.");
                        }
                    });  
                };
                socket.on("players", function (data) {
                    $scope.players = data;
                });
                socket.on("games", function (data) {
                    $scope.games = data;
                });
            },
            controllerAs: "lobbyCtrl"
        };
    });

})();