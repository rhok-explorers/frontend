'use strict';

angular.module('ngApp')
    .controller('RoutesCtrl', function ($rootScope, $scope) {
        //
        var map_canvas = document.getElementById('map_canvas');
        var map_options = {
            center: new google.maps.LatLng(46.0667, 11.1167), // coords di trento
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };

        var map = new google.maps.Map(map_canvas, map_options);
        //
        function initialize() {

            google.maps.event.addListener(map, 'click', function(event) {
                if (!$scope.selectedWalkingId) {
                    return;
                }
                $scope.$apply(function() {
                    $scope.poi.coords = event.latLng;
                    $('#modalPoi').modal();
                });
            });

        };
        //
        $scope.placeMarker = function(location, data) {
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
        }
        //
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
            $('#modalWalking').modal('hide');
            $scope.walking = {};
        }
        //
        $scope.addPoi = function() {
            var coords = $scope.poi.coords;
            console.log($scope.poi);
            $scope.poi.coords = [coords.pb, coords.qb];
            socket.emit("poi.set", { poi: $scope.poi, walkingId: $scope.selectedWalkingId });
            $('#modalPoi').modal('hide');
            /*$scope.placeMarker(coords);*/
            $scope.poi = {};
        }
        //
        $scope.addAnswer = function() {
            if (!$scope.poi.question) {
                $scope.poi.question = {};
            }
            if (!$scope.poi.question.answers) {
                $scope.poi.question.answers = [];
            }
            $scope.poi.question.answers.push({})
        }
        //
        socket.on("walking.data", function(walkings) {
            $scope.$apply(function() {
                _.forEach(walkings, function(walking) {
                    console.log(walking);
                    $scope.routes.push(walking);
                });
            });
        });
        //
        socket.on("poi.data", function(poi) {
            $scope.$apply(function() {
                console.log("Received poi data: " + JSON.stringify(poi));
                // add poi to map
                $scope.placeMarker(new google.maps.LatLng(poi.coords[0] + 0, poi.coords[1] + 0), {
                    name: poi.name,
                    description: poi.description
                });
            })
        })
    });
