var map = L.map('mapid').setView([0, 0], 2);

// fetch('lectures.json')
//     .then((data) => data.json())
//     .then((data) => {
//         data.forEach(element => {

//             L.marker([element.lat, element.lon]).bindPopup(
//                 `<b>Aula X</b><br><p>${element.name}</p><p>${element.body}</p><a href="https://meet.jit.si/${element.id}" target="_blank">Entrar</a>`).openPopup().addTo(map);
//         });
//     })

L.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    minZoom: 2,
    maxZoom: 4,
    attribution: 'NASA'
}).addTo(map);

// var circleCenter = [-14, -15]

// var circleOptions = {
//     color: 'black',
//     fillColor: 'black',
//     fillOpacity: 1
// }

// var circle = L.circle(circleCenter, 1050000, circleOptions);

// circle.addTo(map)

let popup = `

<div class="popTitle">This is My Room's Title</div>
<div class="popName">My Super Name</div>
<div class="popTheme">Theme</div>
<div class="popLang">Language</div>
<div class="popBody">Here you can explain what your room wil be about - and all the importa information</div>
<a>
<div class="popButton">
Enter
</div>
</a>

`

var ManIcon = L.Icon.extend({
    options: {
        iconSize: [30, 30],
        shadowSize: [50, 64],
        shadowAnchor: [4, 62],
        popupAnchor: [0, -10],
    }
});

var MagIcon = L.Icon.extend({
    options: {
        iconSize: [40, 40],
        shadowSize: [50, 64],
        shadowAnchor: [4, 62],
        popupAnchor: [0, -10],
    }
});

var AstIcon = L.Icon.extend({
    options: {
        iconSize: [60, 60],
        shadowSize: [50, 64],
        shadowAnchor: [4, 62],
        popupAnchor: [0, -10],
    }
});

var SpaceIcon = L.Icon.extend({
    options: {
        iconSize: [120, 120],
        shadowSize: [50, 64],
        shadowAnchor: [4, 62],
    }
});

var astronaut = new AstIcon({
    iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/male-astronaut-type-4_1f468-1f3fd-200d-1f680.png',
})

var space = new SpaceIcon({
    iconUrl: 'https://media3.giphy.com/media/i2tLw5ZyikSFdkeGHT/giphy.gif?cid=ecf05e47573bf74f5326276941a92a4c6e32509e93002154&rid=giphy.gif',
})

var wom = new ManIcon({
    iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/118/woman_emoji-modifier-fitzpatrick-type-4_1f469-1f3fd_1f3fd.png',
})

var man = new ManIcon({
    iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/man_emoji-modifier-fitzpatrick-type-4_1f468-1f3fd_1f3fd.png',
})

var mag = new MagIcon({
    iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/118/left-pointing-magnifying-glass_1f50d.png',
})

fetch("https://api.nasa.gov/planetary/apod?api_key=sV6GZxy33Ie3IDPsXyIdBqkhkYyiFXf6LYkDONCm")
    .then(data => data.json())
    .then(data => {

        let explanation = (data.explanation).substring(0, 200)

        let popupA = `

<div class="popTitle">Talk to an Astronaut</div>
<div class="popName">My Super Name</div>
<div class="popTheme">Theme</div>
<div class="popLang">Language</div>
<div class="popBody">${explanation}</div>
<div class="popCopy"> &copy; ${data.copyright}</div>
<img class="popImg" src="${data.url}">
<a>
<div class="popButton">
Enter
</div>
</a>
`

        L.marker([-14, -15], { icon: astronaut }).bindPopup(popupA).openPopup().addTo(map)
    })

L.marker([-14, -15], { icon: space }).addTo(map)
L.marker([-25, -49], { icon: mag }).bindPopup(popup).openPopup().addTo(map)

for (let i = 0; i < 10; i++) {
    L.marker([getRndInteger(-50, 50), getRndInteger(-50, 50)], { icon: man }).bindPopup(popup).openPopup().addTo(map)
    L.marker([getRndInteger(-50, 50), getRndInteger(-50, 50)], { icon: wom }).bindPopup(popup).openPopup().addTo(map)
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}