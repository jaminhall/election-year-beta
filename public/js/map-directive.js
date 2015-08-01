(function () {
    var app = angular.module("map-directive", []);

    app.directive("map", function () {
        return {
            restrict: "E",
            templateUrl: "templates/map.html",
            scope: {
                currentPlayer: "="
            },
            controller: function ($scope, socket) {
                $scope.currentPlayer.x = 300;
                $scope.currentPlayer.y = 50;

                $scope.mapClicked = function (region) {
                    var position = {
                        game: $scope.currentPlayer.currentGame,
                        playerName: $scope.currentPlayer.name,
                        region: region,
                        x: 0,
                        y: 0
                    }
                    if (region == "Region 1") {
                        position.x = 460;
                        position.y = 30;
                    }
                    if (region == "Region 2") {
                        position.x = 425;
                        position.y = 62;
                    }
                    if (region == "Region 3") {
                        position.x = 420;
                        position.y = 100;
                    }
                    if (region == "Region 4") {
                        position.x = 395;
                        position.y = 248;
                    }
                    if (region == "Region 5") {
                        position.x = 355;
                        position.y = 208;
                    }
                    if (region == "Region 6") {
                        position.x = 360;
                        position.y = 160;
                    }
                    if (region == "Region 7") {
                        position.x = 355;
                        position.y = 90;
                    }
                    if (region == "Region 8") {
                        position.x = 280;
                        position.y = 180;
                    }
                    if (region == "Region 9") {
                        position.x = 280;
                        position.y = 80;
                    }
                    if (region == "Region 10") {
                        position.x = 215;
                        position.y = 110;
                    }
                    if (region == "Region 11") {
                        position.x = 210;
                        position.y = 220;
                    }
                    if (region == "Region 12") {
                        position.x = 110;
                        position.y = 140;
                    }
                    if (region == "Region 13") {
                        position.x = 15;
                        position.y = 130;
                    }
                    if (region == "Region 14") {
                        position.x = 80;
                        position.y = 40;
                    }
                    if (region == "Region 15") {
                        position.x = 60;
                        position.y = 310;
                    }

                    socket.emit("player:move", position, function (success) {

                    });
                };

                socket.on("game:updated", function (data) {
                    $scope.players = data.players;

                });
            }
        };
    });

    app.directive('ngx', function () {
        return function (scope, element, attrs) {
            scope.$watch(attrs.ngx, function (value) {
                element.attr('x', value);
            });
        };
    })

})();