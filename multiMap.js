//start: locates to current location of user

$(document).ready(function() {
    getGeolocation(function(coords) {
        console.log(coords);
        drawLocation(coords.latitude, coords.longitude)
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
    new maptalks.VectorLayer('vector', point).addTo(map);

}

//end: locates to current location of user

//locates a location using coordinates

function replaceMap() {

    map.center = [parseFloat((document.getElementById("longi")).value), parseFloat((document.getElementById("lat")).value)];

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
                pitch: 65,
                bearing: 360
            }, {
                duration: 7000
            });
        }, 7000);
    }

}