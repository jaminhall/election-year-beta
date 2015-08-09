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
                    //console.log(this.$parent.drivingRestrictions);
                    //console.log(this.currentPlayer.currentRegion);
                    //console.log(region);
                    console.log(this);
                    
                    
                    var go = false;
                    
                    //Has clicked on an option
                    console.log(this.currentPlayer.isTraveling);
                    if(this.currentPlayer.isTraveling == true){
                        console.log("Road = "+this.currentPlayer.roadTravel);
                        console.log("Air = "+this.currentPlayer.airTravel);
                        if(this.currentPlayer.isDriving == true){
                            if(this.currentPlayer.roadTravel > 0){
                                //Driving restrictions
                                for(i=0; i != this.$parent.drivingRestrictions.length; i++){
                                    if(this.$parent.drivingRestrictions[i].currentRegion == this.currentPlayer.currentRegion){
                                        for(x=0; x != this.$parent.drivingRestrictions[i].avalibleRegions.length; x++){
                                            if(region == this.$parent.drivingRestrictions[i].avalibleRegions[x]){
                                                console.log("Current Region = "+region);
                                                console.log("Avalible Region = "+this.$parent.drivingRestrictions[i].avalibleRegions[x]);
                                                go = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }else if(this.currentPlayer.isFlying == true){
                            if(this.currentPlayer.airTravel > 0){
                                //Flying 
                                go = true;
                            }
                        }
                    }

                    
                    if(go){
                        //Detect air / road
                        this.currentPlayer.roadTravel -= 1;
                        this.currentPlayer.airTravel -= 1;

                        var position = {
                            game: $scope.currentPlayer.currentGame,
                            playerName: $scope.currentPlayer.name,
                            region: region,
                            x: 0,
                            y: 0
                        }
                        switch(region){
                            case 1:
                                position.x = 460;
                                position.y = 30;
                                break;
                            case 2:
                                position.x = 425;
                                position.y = 62;
                                break;
                            case 3:
                                position.x = 420;
                                position.y = 100;
                                break;
                            case 4:
                                position.x = 395;
                                position.y = 248;
                                break;
                            case 5:
                                position.x = 355;
                                position.y = 208;
                                break;
                            case 6:
                                position.x = 360;
                                position.y = 160;
                                break;
                            case 7:
                                position.x = 355;
                                position.y = 90;
                                break;
                            case 8:
                                position.x = 280;
                                position.y = 180;
                                break;
                            case 9:
                                position.x = 280;
                                position.y = 80;
                                break;
                            case 10:
                                position.x = 215;
                                position.y = 110;
                                break;
                            case 11:
                                position.x = 210;
                                position.y = 220;
                                break;
                            case 13:
                                position.x = 15;
                                position.y = 130;
                                break;
                            case 14:
                                position.x = 80;
                                position.y = 40;
                                break;
                            case 15:
                                position.x = 60;
                                position.y = 310;
                                break;
                        }
                        /*if (region == "Region 1") {
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
                        }*/

                        socket.emit("player:move", position, function (success) {
                            //$scope.currentPlayer.raodTravel;
                            //$scope.currentPlayer.airTravel;
                        });
                    }else{
                        //Can't drive there    
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