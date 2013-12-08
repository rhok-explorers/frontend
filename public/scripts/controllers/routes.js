'use strict';

angular.module('ngApp')
    .controller('RoutesCtrl', function ($rootScope, $scope) {
        //
        function initialize() {
            var map_canvas = document.getElementById('map_canvas');
            var map_options = {
                center: new google.maps.LatLng(46.0667, 11.1167), // coords di trento
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.HYBRID
            };

            var map = new google.maps.Map(map_canvas, map_options);

            google.maps.event.addListener(map, 'click', function() {
                if (!$scope.selectedWalkingId) {
                    return;
                }
                console.log("qui");
                $('#modalPoi').modal();
                //addPoi(map.getPosition());
            });

            function placeMarker(location) {
                if (!$scope.selectedWalkingId) {
                    return;
                }
                $scope.$apply(function() {
                    $scope.poi.coords = location;
                })
                //
                var marker = new google.maps.Marker({
                    position: location,
                    map: map
                });
            }

            google.maps.event.addListener(map, 'click', function(event) {
                placeMarker(event.latLng);
            });

        };
        initialize();
        $scope.routes = [];
        $scope.selectedWalkingId = null;
        //
        $scope.selectWalking = function(walkingId) {
            $scope.selectedWalkingId = walkingId;
        };
        //
        $scope.walking = {
            name: null,
            description: null,
            level: null
        };
        //
        $scope.poi = {
            name: null,
            description: null,
            coords: null
        }
        //
        $scope.addWalking = function() {
            console.log($scope.walking);
            socket.emit("walking.set", $scope.walking);
            $scope.walking = {};
        }
        //
        $scope.addPoi = function() {
            console.log($scope.poi);
            socket.emit("poi.set", { poi: $scope.poi, walkingId: $scope.selectedWalkingId });
            $scope.poi = {};
        }
        //
        socket.on("walking.data", function(walkings) {
            $scope.$apply(function() {
                _.forEach(walkings, function(walking) {
                    console.log(walking);
                    $scope.routes.push(walking);
                });
            });
        })
    });
