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
                    if (region == "region1") {
                        $scope.currentPlayer.x = 450;
                        $scope.currentPlayer.y = 50;
                    }
                    if (region == "region15") {
                        $scope.region15Style = "disabled";
                        $scope.currentPlayer.x = 50;
                        $scope.currentPlayer.y = 300;
                    }
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