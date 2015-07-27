(function () {
    var app = angular.module("game-directives", []);


    app.directive("game", function () {
        return {
            restrict: "E",
            templateUrl: "templates/game.html",
            scope: {
                currentPlayer: "="
            },
            controller: function ($scope, socket) {
                $currentPlayerIndex = -1;
                socket.on("game:updated", function (data) {
                    $scope.currentPlayer.currentGame = data.name;
                    $scope.gameName = data.name;
                    $scope.players = data.players;
                    $scope.actionCards = data.actionCards;
                    for (var i in $scope.players) {
                        if ($scope.players[i].name == $scope.currentPlayer.name) {
                            $scope.currentPlayer.hand = data.players[i].hand;
                        }
                    }

                });
                socket.on("game:cancelled", function () {
                    $scope.currentPlayer.inGame = false;
                });
                socket.on("game:startTurn", function (index) {
                    $scope.currentPlayerIndex = index;
                    $scope.myTurn = $scope.players[$scope.currentPlayerIndex].name == $scope.currentPlayer.name;
                });
                $scope.startGame = function () {
                    socket.emit("game:start", $scope.gameName, function (success) {
                        if (success) {
                            $scope.gameStarted = true;
                        } else {

                        }
                    });
                };
                $scope.endTurn = function () {
                    socket.emit("game:endTurn", $scope.gameName, function (success) {
                        if (success) {

                        } else {

                        }
                    });
                };
            }
        };
    });

})();