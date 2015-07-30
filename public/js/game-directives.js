(function () {
    var app = angular.module("game-directives", ["map-directive"]);


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
                            $scope.currentPlayer.regionCards = data.players[i].regionCards;
                            $scope.currentPlayer.candidateCard = data.players[i].candidateCard;

                            console.log($scope.currentPlayer.regionCards);
                        }
                    }

                });
                socket.on("game:started", function () {
                    $scope.gameStarted = true;
                });
                socket.on("game:cancelled", function () {
                    $scope.gameStarted = false;
                    $scope.myTurn = false;
                    $scope.currentPlayer.hand = [];
                    $scope.currentPlayer.regionCards = [];
                    $scope.currentPlayer.candidateCard = {
                        image: ""
                    };
                    $scope.currentPlayer.actionCards = [];
                    $scope.gameName = "";
                    $scope.currentPlayer.inGame = false;
                });
                socket.on("game:startTurn", function (index) {
                    $scope.currentPlayerIndex = index;
                    $scope.myTurn = $scope.players[$scope.currentPlayerIndex].name == $scope.currentPlayer.name;
                    $scope.currentPlayer.airTravel = $scope.players[$scope.currentPlayerIndex].airTravel;
                    $scope.currentPlayer.roadTravel = $scope.players[$scope.currentPlayerIndex].roadTravel;
                    $scope.currentPlayer.isTravelling = false;
                });
                socket.on("player:disconnected", function (player) {

                });
                $scope.startGame = function () {
                    socket.emit("game:start", $scope.gameName, function (success) {
                        if (success) {
                            //$scope.gameStarted = true;
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
                $scope.playCard = function (card) {
                    if ($scope.myTurn) {
                        //Take action
                        //Remove the card from the player's hand
                        for (var i = $scope.currentPlayer.hand.length; i >= 0; i--) {
                            if (card == $scope.currentPlayer.hand[i]) {
                                $scope.currentPlayer.hand.splice(i, 1);
                                break;
                            }
                        }
                    }
                };
                $scope.chooseTravelMethod = function (method) {
                    socket.emit("game:setTravelMethod", {
                        gameName: $scope.gameName,
                        travelMethod: method
                    }, function (success) {
                        $scope.currentPlayer.isTravelling = true;
                    });
                };

                $scope.mapClicked = function (region) {
                    alert(region);
                };
            }
        };
    });

})();