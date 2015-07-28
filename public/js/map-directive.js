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
                $scope.mapClicked = function (region) {
                    if (region == "region15") $scope.region15Style = "disabled";
                };
            }
        };
    });

})();