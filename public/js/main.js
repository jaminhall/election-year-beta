(function () {

    var app = angular.module("GameApp", ["game-directives", "lobby-directives"]).controller(
        "AppController",
        function ($scope, socket) {
            $scope.players = [];
            $scope.currentPlayer = {
                name: "",
                loggedIn: false,
                inGame: false
            };
            $scope.title = "Something";

        }
    );

    app.factory('socket', function ($rootScope) {
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    });

})();






/*
app.controller("GameController", function($scope, socket) {
    $scope.players = [];
    $scope.me = {};
    
    $scope.enterLobby = function(event) {
        event.preventDefault();
        
        console.log(socket);
        socket.emit('new player', $scope.newplayer.name, function(success){
            if (success) {
                $scope.me.name = $scope.newplayer.name;
                //console.log("hello " + $scope.me.name);
            }
            else {
                alert("Some already has that name, fool!");
            }  
        });
    }
    
    socket.on("players", function(data) {
        
        $scope.players = data;
        //$scope.$digest();
    });
});
*/