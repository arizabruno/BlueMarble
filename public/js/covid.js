var map = L.map('mapid', {
    zoomControl: false
}).setView([0, 0], 3);
let dark = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
let light = "https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}"

var southWest = L.latLng(-89.98155760646617, -180),
    northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds)

map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});

let layer = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
    attribution: 'NASA | GIBS | CARTO  ',
    minZoom: 3,
    maxZoom: 8,
    format: 'jpg',
    noWrap: true,
    opacity: 1,
    maxBoundsViscosity: 1,
    time: '',
    tilematrixset: 'GoogleMapsCompatible_Level'
}).addTo(map);

let layer2 = L.tileLayer(dark, {
    attribution: '',
    minZoom: 3,
    // maxZoom: 4,
    noWrap: true,
    maxBounds: bounds,
    maxBoundsViscosity: 1,
    opacity: 1,
}).addTo(map);

layer.setZIndex(100)
layer2.setZIndex(80)


var VirIcon = L.Icon.extend({
    options: {
        iconSize: [20, 20],
        shadowSize: [50, 64],
        shadowAnchor: [4, 62],
        popupAnchor: [0, -10],
    }
});

var virus = new VirIcon({
    iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/237/microbe_1f9a0.png'
})

var ID = function() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

//COVID

fetch("https://www.trackcorona.live/api/countries")
    .then(data => data.json())
    .then(data => {
        let arr = data.data
        arr.forEach(element => {
            let out = ['Togo', 'Georgia', 'Coral Princess', 'Diamond Princess']
            if (element.location != out[0] &&
                element.location != out[1] &&
                element.location != out[2] && element.location != out[3]) {

                let loc = element.location
                let arr = loc.split('')
                let keyArr = []
                arr.forEach(ele => {


                    keyArr.push(ele.charCodeAt(0))
                });
                let key = keyArr.join('')
                let popupV = `

<div class="popTitle">${element.location}</div>
<div class="popTheme"><b>Confirmed: </b> ${element.confirmed}</div>
<div class="popTheme"><b>Deaths: </b> ${element.dead}</div>
<div class="popTheme"><b>Recovered: </b> ${element.recovered}</div>
<div style="width: 100%; display: flex; justify-content: center;>
<div class="popBody" style="width:100px; font-size:10px">Discuss the COVID-19 pandemic in ${element.location}!</div>
</div>
<a href="room.html?key=${key}" target="_blank">
<div class="popButton">
Enter Room
</div>
</a>
`


                L.marker([element.latitude, element.longitude], { icon: virus }).bindPopup(popupV).openPopup().addTo(map)

            }
        });
    })

function encode(string) {
    let arr = string.split('')
    let keyArr = []
    arr.forEach(ele => {
        keyArr.push(ele.charCodeAt(0))
    });
    return keyArr.join('')
}