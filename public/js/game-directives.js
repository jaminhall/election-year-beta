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
                            $scope.currentPlayer.currentRegion = data.players[i].currentRegion;
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
                    $scope.myTurnStarted = $scope.myTurn = $scope.players[$scope.currentPlayerIndex].name == $scope.currentPlayer.name;
                    $scope.currentPlayer.airTravel = $scope.players[$scope.currentPlayerIndex].airTravel;
                    $scope.currentPlayer.roadTravel = $scope.players[$scope.currentPlayerIndex].roadTravel;
                    $scope.currentPlayer.isTravelling = false;
                    if ($scope.myTurnStarted) {
                        $scope.showHand = false;
                        $scope.showPoints = false;
                    }
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
                        var action = {
                            card: card,
                            player: $scope.currentPlayer,
                            game: $scope.gameName
                        }
                        socket.emit("game:playCard", action, function (success) {
                            if (success) {
                                /* console.log($scope.currentPlayer.hand);
                                 for (var i = $scope.currentPlayer.hand.length - 1; i >= 0; i--) {
                                     console.log($scope.currentPlayer.hand[i]);
                                     if (card.name == $scope.currentPlayer.hand[i].name) {
                                         console.log("Yes");
                                         $scope.currentPlayer.hand.splice(i, 1);
                                         break;
                                     }
                                 }
                                 console.log($scope.currentPlayer.hand);
                                 */
                            }
                        });



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