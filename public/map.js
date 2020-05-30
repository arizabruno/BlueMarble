var mymap = L.map('mapid').setView([0, 0], 2);

fetch('lectures.json')
    .then((data) => data.json())
    .then((data) => {
        data.forEach(element => {

            L.marker([element.lat, element.lon]).bindPopup(
                `<b>Aula X</b><br><p>${element.name}</p><p>${element.body}</p><a href="https://meet.jit.si/${element.id}" target="_blank">Entrar</a>`).openPopup().addTo(mymap);
        });
    })

L.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 4,
    attribution: 'NASA'
}).addTo(mymap);

var circleCenter = [-14, -15]

var circleOptions = {
    color: 'black',
    fillColor: 'black',
    fillOpacity: 1
}

var circle = L.circle(circleCenter, 1050000, circleOptions);

circle.addTo(mymap)