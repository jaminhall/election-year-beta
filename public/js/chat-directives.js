(function () {
    var app = angular.module("chat-directives", []);

    app.directive("chat", function () {
        return {
            restrict: "E",
            templateUrl: "templates/chat.html",
            scope: {
                currentPlayer: "=",
            },
            controller: function ($scope, socket) {
                $scope.messages = [];
                $scope.newmessage = "";
                $scope.sendMessage = function () {
                    if ($scope.newmessage != "") {
                        var message = {
                            sender: $scope.currentPlayer.name,
                            body: $scope.newmessage
                        };
                        socket.emit('message:send', message);
                        $scope.newmessage = "";
                    }
                };
                socket.on('message:received', function (message) {
                    $scope.messages.push(message);
                });
            }
        };
    });


})();