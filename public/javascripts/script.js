     var mymap = L.map('worldmap', 
     {
      center: [48.866667, 2.333333],
      zoom: 4
     }
     );
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mymap);


var citiesLoLa = document.getElementsByClassName('cityPosition'); 

var greenIcon = L.icon({
   iconUrl: './images/leaf-green.png',
   shadowUrl: './images/leaf-shadow.png',

   iconSize:     [38, 95], // size of the icon
   shadowSize:   [50, 64], // size of the shadow
   iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
   shadowAnchor: [4, 62],  // the same for the shadow
   popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

for (var i = 0; i < citiesLoLa.length; i++){

   var lon = citiesLoLa[i].dataset.longitude;
   var lat = citiesLoLa[i].dataset.latitude;
   var nameCity = citiesLoLa[i].dataset.name;
   var marker =L.marker([lat, lon],{icon: greenIcon}).addTo(mymap);
   marker.bindPopup(nameCity.toUpperCase()).openPopup();


   
  
};

