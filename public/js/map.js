var map = L.map('mapid', {
    zoomControl: false
}).setView([0, 0], 3);

let open = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    // let gis = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    // let dark = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
    // let nasa2 = 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/2012/8/{z}/{y}/{x}.png'
let nasa = 'http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg'

let iconLinks = [
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/girl_1f467.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/adult_1f9d1.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/man_1f468.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/woman_1f469.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/older-man_1f474.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/older-woman_1f475.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/male-teacher_1f468-200d-1f3eb.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/female-teacher_1f469-200d-1f3eb.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/person-with-headscarf_1f9d5.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/man-wearing-turban_1f473-200d-2642-fe0f.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/male-scientist_1f468-200d-1f52c.png",
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/118/female-scientist_1f469-200d-1f52c.png",
]

var southWest = L.latLng(-89.98155760646617, -180),
    northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds)

map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});

let back = L.tileLayer(open, {
    attribution: 'NASA | OpenStreetMap',
    minZoom: 3,
    // maxZoom: 4,
    noWrap: true,
    maxBounds: bounds,
    maxBoundsViscosity: 1,
}).addTo(map);

let layer2 = L.tileLayer(nasa, {
    attribution: '',
    minZoom: 3,
    // maxZoom: 4,
    noWrap: true,
    maxBounds: bounds,
    maxBoundsViscosity: 1,
    opacity: 1,
}).addTo(map);

back.setZIndex(70)
    // layer.setZIndex(90)
layer2.setZIndex(80)

firebase.database().ref("rooms").once('value', function(snap) {
    if (snap.val()) {
        let arr = Object.values(snap.val())
        arr.forEach(element => {

            if (element.date + 10800000 > Date.now()) {


                let fulldate = new Date(element.date)
                let dateArr = fulldate.toString().split(" ")
                let date = dateArr[0] + " " + dateArr[1] + " " + dateArr[2] + ", " + dateArr[3] + ", " + dateArr[4]
                let left
                let popup = `

<div class="popTitle">${element.title}</div>
<div class="popName">Host: ${element.name}</div>
<div class="popTheme"><b>Theme:</b> ${returnTheme(element.theme)}</div>
<div class="popLang"><b>Language:</b> ${returnLang(element.lang)}</div>
<div class="popBody">${element.desc}</div>
<div class="popDate">${date}</div>
<div class="popDateLeft" id="${element.key}"></div>
<a href="room.html?key=${element.key}" target="_blank">
<div class="popButton">
Enter Room
</div>
</a>
`
                setInterval(() => {
                    if (document.getElementById(element.key)) {
                        document.getElementById(element.key).innerHTML = "<b>Time left:</b> " + updateETime(element.date)
                    }
                }, 1000)
                let thisIcon = returnIcon(element.avatar)

                L.marker([element.lat, element.lon], { icon: thisIcon }).bindPopup(popup).openPopup().addTo(map)

            } else {
                firebase.database().ref("rooms").child(element.key).remove()
            }

        });

    }
})

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

var VirIcon = L.Icon.extend({
    options: {
        iconSize: [20, 20],
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
    iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/astronaut_1f9d1-200d-1f680.png',
})

var space = new SpaceIcon({
    iconUrl: 'https://media3.giphy.com/media/i2tLw5ZyikSFdkeGHT/giphy.gif',
})

var mag = new MagIcon({
    iconUrl: './img/icons/mag.png'
})

var virus = new VirIcon({
    iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/237/microbe_1f9a0.png'
})

function returnIcon(avatar) {
    let num = parseInt(avatar)
    let link = iconLinks[num]
    let icon = new ManIcon({
        iconUrl: link
    })
    return icon
}

let spaceMarker = L.marker([-14, -15], { icon: space }).addTo(map)
spaceMarker.setZIndexOffset(100)

fetch("https://api.nasa.gov/planetary/apod?api_key=" + API_KEY)
    .then(data => data.json())
    .then(data => {

        let explanation = firstThreeSentences(data.explanation)

        let popupA = `

<div class="popTitle">Talk to an Astronaut</div>
<div class="popTheme">Discuss the image below</div>
<div class="popLang">Language: <span class="blue">English</span></div>
<div class="popBody">${explanation}</div>
<div class="outImg">
<div class="popCopy blue"> &copy; ${data.copyright}</div>
<img class="popImg" src="${data.url}">
</div>
<a href="room.html?key=bluemarblespacechatimageoftheday" target="_blank">
<div class="popButton">
Enter Room
</div>
</a>
`

        let astroMarker = L.marker([-14, -15], { icon: astronaut }).bindPopup(popupA).openPopup().addTo(map)

        astroMarker.setZIndexOffset(900)

    })
var ID = function() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

let magData = [{
        "lon": -58.7109375,
        "lat": -11.6952727,
        "body": "Did you know? South America presented a reduced amount of CH4 in the atmosphere from 2019 to 2020",
        "link": "https://firebasestorage.googleapis.com/v0/b/blue-marble-app.appspot.com/o/gif1.gif?alt=media&token=33cffdb1-60d4-4533-9946-a6705c211c5e",
        "cont": "South America",
        "source": "https://giovanni.gsfc.nasa.gov"


    },
    {
        "lon": -101.567478,
        "lat": 37.7185903,
        "body": "Did you know? The vegetation index presented an improvement from March 2019, to March 2020.",
        "link": "https://firebasestorage.googleapis.com/v0/b/blue-marble-app.appspot.com/o/Gif%20USA%20Oficial.gif?alt=media&token=e7241507-4eea-49ea-8c81-26b6794a1f86",
        "cont": "North America",
        "source": "https://neo.sci.gsfc.nasa.gov"


    },
    {
        "lon": 39.375,
        "lat": 52.6963611,
        "body": "Did you know? From March of 2019 to March 2020, the vegetation index had a significant improvement",
        "link": "https://firebasestorage.googleapis.com/v0/b/blue-marble-app.appspot.com/o/Gif%20Europa%20Oficial.gif?alt=media&token=5de1e8ce-ab1d-4b92-82e5-a43fa5231c3b",
        "cont": "Europe/Asia",
        "source": "https://neo.sci.gsfc.nasa.gov"

    },
    {
        "lon": 107.9296875,
        "lat": 44.5904672,
        "body": "Did you know? The emission of NO2 was considerably reduced between January and February from 2020",
        "link": "https://firebasestorage.googleapis.com/v0/b/blue-marble-app.appspot.com/o/ezgif.com-video-to-gif%20(4).gif?alt=media&token=1b4577a9-183a-4526-94a1-2e0b9394c638",
        "cont": "Asia",
        "source": "https://earthobservatory.nasa.gov"

    },
    {
        "lon": 137.109375,
        "lat": -25.1651734,
        "body": "Did you know? The amount of CH4 in the atmosphere is gradually decreasing in Oceania",
        "link": "https://firebasestorage.googleapis.com/v0/b/blue-marble-app.appspot.com/o/ezgif.com-video-to-gif%20(2).gif?alt=media&token=1b4577a9-183a-4526-94a1-2e0b9394c638",
        "cont": "Oceania",
        "source": "https://giovanni.gsfc.nasa.gov"


    },
    {
        "lon": 23.3789063,
        "lat": 7.5367643,
        "body": "Did you know? In March 2020, there was a significant decrease in the abnormal temperatures that were occurring in the same period of last year.",
        "link": "https://firebasestorage.googleapis.com/v0/b/blue-marble-app.appspot.com/o/ezgif.com-video-to-gif%20(5).gif?alt=media&token=1b4577a9-183a-4526-94a1-2e0b9394c638",
        "cont": "Africa",
        "source": "https://neo.sci.gsfc.nasa.gov"


    }
]

magData.forEach(element => {

    let popupM = `

<div class="popTitle">Discuss a Topic</div>
<div class="popTheme blue">${element.cont}</div>
<div class="popBody">${element.body}</div>
<div class="outImg">
<a class="popCopy blue" target="_blank" href="${element.source}">Source</a>
<img class="popImg" src='${element.link}'/>
</div>
<a href="room.html?key=${encode((element.body).substring(0,30))}" target="_blank">
<div class="popButton">
Enter Room
</div>
</a>
`
    L.marker([element.lat, element.lon], { icon: mag }).bindPopup(popupM).openPopup().addTo(map)
});

function returnLang(lang) {
    var intLang = parseInt(lang)
    if (intLang === 1) {
        return "English"
    } else if (intLang === 2) {
        return "Portuguese"
    } else if (intLang === 3) {
        return "Spanish"
    } else if (intLang === 4) {
        return "French"
    } else if (intLang === 5) {
        return "Chinese"
    } else if (intLang === 6) {
        return "Japanese"
    } else if (intLang === 7) {
        return "Russian"
    } else if (intLang === 8) {
        return "Hindi"
    } else {
        return null
    }
}

function returnTheme(theme) {
    var intTheme = parseInt(theme)

    if (intTheme === 1) {
        return "Storytelling 📖"
    } else if (intTheme === 2) {
        return "Chat 💬"
    } else if (intTheme === 3) {
        return "Lecture 🎓"
    } else if (intTheme === 4) {
        return "Environment 🌳"
    } else if (intTheme === 5) {
        return "Space 🚀"
    } else if (intTheme === 6) {
        return "Sports ⚽️"
    } else if (intTheme === 7) {
        return "Health 🏥"
    } else if (intTheme === 8) {
        return "Networking 🌎"
    } else {
        return null
    }
}

function updateETime(time) {

    var diff = time - Date.now() + 10800000;

    function pad(num) {
        return num > 9 ? num : '0' + num;
    };


    days = Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours = Math.floor(diff / (1000 * 60 * 60)),
        mins = Math.floor(diff / (1000 * 60)),
        secs = Math.floor(diff / 1000),

        dd = days,
        hh = hours - days * 24,
        mm = mins - hours * 60,
        ss = secs - mins * 60;

    let output =
        pad(hh) + ':' + //' hours ' +
        pad(mm) + ':' + //' minutes ' +
        pad(ss); //+ ' seconds' ;

    return output

}

function encode(string) {
    let arr = string.split('')
    let keyArr = []
    arr.forEach(ele => {
        keyArr.push(ele.charCodeAt(0))
    });
    return keyArr.join('')
}

function firstThreeSentences(text) {
    var j = 0;
    var r = '';
    for (var i = 0; i < text.length; i++) {
        if (text.charAt(i) === '.') {
            j++;
        }
        r += text.charAt(i);
        if (j === 3) {
            return r;
        }
    }
}