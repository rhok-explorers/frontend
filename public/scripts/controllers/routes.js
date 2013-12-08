'use strict';

angular.module('ngApp')
    .controller('RoutesCtrl', function ($rootScope, $scope) {
        // first step: load walkings!
        socket.emit("walking.get", {});
        //
        var map_canvas = document.getElementById('map_canvas');
        var map_options = {
            center: new google.maps.LatLng(46.0667, 11.1167), // coords di trento
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        $scope.markers = [];

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
            $scope.markers.push(marker);
        }
        //
        $scope.cleanMarkers = function() {
            _.forEach($scope.markers, function(marker) {
                marker.setMap(null);
            });
            $scope.markers = [];
        }
        //
        initialize();
        $scope.routes = [];
        $scope.selectedWalkingId = null;
        //
        $scope.selectWalking = function(walkingId) {
            $scope.selectedWalkingId = walkingId;
            socket.emit("walking.get", {id: walkingId, isDetails: true});
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
            console.log("Received: " + JSON.stringify(walkings));
            $scope.$apply(function() {
                var isDetails = walkings[0].isDetails || false;
                if (!isDetails) {
                    console.log("Is not details");
                    _.forEach(walkings, function(walking) {
                        console.log(walking);
                        $scope.routes.push(walking);
                    });
                } else {
                    console.log("Is details");
                    $scope.cleanMarkers();
                    // carico i poi solo se ho selezionato un walking
                    _.forEach(walkings[0].pois, function(poi) {
                        socket.emit("poi.get", {id: poi.id});
                        // TODO: lazy loading dei poi!
                    })
                }
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
