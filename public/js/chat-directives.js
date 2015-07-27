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
                            body: $scope.newmessage,
                            date: Date.now(),
                            game: $scope.currentPlayer.currentGame
                        };
                        socket.emit('message:send', message);
                        $scope.newmessage = "";
                    }
                };
                socket.on('message:received', function (message) {
                    $scope.messages.push(message);
                    //TODO: Figure out a way to do this with Angular
                    //It'd be great to remove the JQUERY dependency.
                    $('#received-messages').animate({
                        scrollTop: $("#received-messages")[0].scrollHeight
                    }, 1000);
                });

                $('#send-message textarea').keyup(function (e) {
                    if ((e.keyCode || e.which) == 13) { //Enter keycode
                        $scope.sendMessage();
                    }
                });
            }
        };
    });


})();