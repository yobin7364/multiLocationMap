//start: locates to current location of user

$(document).ready(function() {
    getGeolocation(function(coords) {
        console.log(coords);
        drawLocation(coords.latitude, coords.longitude);

    }, function(error) {
        console.log(' ERR:', error)
    });

});

function getGeolocation(fnsuccess, fnerror) {
    if (navigator.geolocation) {
        // geolocation is available
        navigator.geolocation.getCurrentPosition(
            function(position) {
                if (typeof fnsuccess === 'function') {
                    fnsuccess.call(null, position.coords); //--Call CallBack On Success
                }
            },
            function(error) {
                if (typeof fnerror === 'function') {
                    fnerror.call(null, error); //--Call CallBack On Error
                }
            }
        );
    } else {
        // geolocation is not available
        console.log("Browser does not support geolocation services.");
        return false;
    }
}


var map;
var markerLayer;
var markerLayer1;

function drawLocation(currentLatitude, currentLongitude) {
    map = new maptalks.Map('map', {
        center: [currentLongitude, currentLatitude],
        zoom: 15,
        baseLayer: new maptalks.TileLayer('base', {
            urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            subdomains: ['a', 'b', 'c', 'd'],
            attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
        })
    });

    // same point without altitude
    var point = new maptalks.Marker(
        [currentLongitude, currentLatitude]
    );
    markerLayer = new maptalks.VectorLayer('vector', point).addTo(map);

}

//end: locates to current location of user

//locates a location using coordinates

function replaceMap() {
    //check is coordinates values are empty or not
    if ((document.getElementById("longi").value) & (document.getElementById("lat").value)) {

        map.center = [parseFloat((document.getElementById("longi")).value), parseFloat((document.getElementById("lat")).value)];

        // same point without altitude
        var point1 = new maptalks.Marker(
            [parseFloat((document.getElementById("longi")).value), parseFloat((document.getElementById("lat")).value)]
        );
        map.removeLayer(markerLayer);
        if (markerLayer1) {
            map.removeLayer(markerLayer1);
        }
        // var d = new Date();
        // var t = d.getTime();
        // new maptalks.VectorLayer(t, point1).addTo(map);
        markerLayer1 = new maptalks.VectorLayer('vector', point1).addTo(map);

        changeView();

        console.log(map);

        function changeView() {
            map.animateTo({
                center: [parseFloat((document.getElementById("longi")).value), parseFloat((document.getElementById("lat")).value)],
                zoom: 13,
                pitch: 0,
                bearing: 20
            }, {
                duration: 5000
            });
            setTimeout(function() {
                map.animateTo({
                    center: [parseFloat((document.getElementById("longi")).value), parseFloat((document.getElementById("lat")).value)],
                    zoom: 18,
                    pitch: 0,
                    bearing: 0
                }, {
                    duration: 7000
                });
            }, 7000);
        }
    } else {
        alert("Please enter the Coordinate values");
    }
}