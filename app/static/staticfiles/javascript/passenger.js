
 let pickuplat;
let pickuplng;
 function getloc(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showloc);
    }
    else
    {
        alert("invalid location");
    }

 }

 function showloc(position)
 {
   let lat=position.coords.latitude;
   let log=position.coords.longitude;

   pickuplat=lat;
   pickuplng=log;

    document.getElementById("latitude").innerHTML=
    lat;

      document.getElementById("longitude").innerHTML=
    log;

    getAddress(lat, log,"pick")




        // Move the map to the user's location
    map.setView([lat, log], 16);

    // Add a marker
    L.marker([lat, log])
        .addTo(map)
        .bindPopup("📍 Pickup Location")
        .openPopup();
}

    //adresss in input
async function getAddress(lat, lng, inputId) {

    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

    const response = await fetch(url);

    const data = await response.json();

    document.getElementById(inputId).value = data.display_name;
}
    


var map = L.map('map').setView([20.5937,78.9629],5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:'© OpenStreetMap'
}).addTo(map);



// drop location
  let routecontrol;
 let dropmarker;

 map.on("click", function(event){

    let lat = event.latlng.lat;
    let lng = event.latlng.lng;

    getAddress(lat,lng,"drop")

    if(dropmarker){
        map.removeLayer(dropmarker);
    }

    dropmarker = L.marker([lat,lng])
        .addTo(map)
        .bindPopup("📍 Drop Location")
        .openPopup();




// routecalculation/
      

if(routecontrol)
{
    map.removeControl(routecontrol);
}

routecontrol = L.Routing.control({

    waypoints: [

        L.latLng(pickuplat,pickuplng ),

        L.latLng(lat,lng)

    ],

    routeWhileDragging:false

}).addTo(map);


// calculation of the distance ,time,fare

routecontrol.on("routesfound", function(e){

    let route = e.routes[0];

    let distance = route.summary.totalDistance;

    let time = route.summary.totalTime;

    distance = distance / 1000;

    time = Math.round(time / 60);

    document.getElementById("distance").innerHTML =
        "Distance : " + distance.toFixed(2) + " km";

    document.getElementById("time").innerHTML =
        "Time : " + time + " min";

// money calculation


        let fare = 40 + (distance * 12);

document.getElementById("fare").innerHTML =
    "Estimated Fare : ₹" + fare.toFixed(2);



document.getElementById("distancein").value = distance;
document.getElementById("timein").value = time;
document.getElementById("farein").value = fare;


});



});








