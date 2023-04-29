 function BaseMap(earth, legend){
 // Create the base layers.
 var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a baseMaps object.
var baseMaps = {"Street Map": street, "Topographic Map": topo};

//Create an overlay object to hold our overlay.
var overlayMaps = {Earthquakes: earth};

// Create our map, giving it the streetmap and earthquakes layers to display on load.
var myMap = L.map("map", {center: [40.7462, 14.4989], zoom: 5,layers: [street]});

L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);

legend.addTo(myMap);
}


 











var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(queryUrl).then(function (data) {
  //console.log(data.features[0].geometry.coordinates[2]);
  //console.log(data.features.length);

  var earthquakes=L.geoJSON(data, {
    pointToLayer: function (feature, latlng, layer) {
        var geojsonMarkerOptions = {
        radius: feature.properties.mag*1.8,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#ffd326",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8};
        return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(`<h3>${feature.properties.place}</h3><hr>`);
      }});
      
      function getColor(d) {
        if (d> 100){color='#BD0026'}
        else if(d<=100& d>80){color='#E31A1C'}
        else if(d<=80& d>60){color='#FC4E2A'}
        else if(d<=60& d>40){color='#FD8D3C'}
        else if(d<=40& d>20){color='#FEB24C'}
        else if(d<=20& d>0){color='#FED976'}
        else color='#FFEDA0';
      return  color}
   
  //console.log(earthquakes.options.color);
  
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
       var div = L.DomUtil.create('div', 'info legend');
      labels = [">100","80-100","60-80","40-60","20-40","0-20","<0"];
      grades=[200, 100, 80, 60, 40, 20, 0]
      xam=[];
      let legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + 0 + "</div>" +
        "<div class=\"max\">" + 100 + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML += 
        xam.push("<li style=\"background-color:"+getColor(grades[i])+"\">" + labels[i] + "</li>");
         }
   div.innerHTML = xam.join('');


return div;
 };  
      
 BaseMap(earthquakes, legend);

});


