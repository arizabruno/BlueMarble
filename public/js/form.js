let name = document.getElementById("name")
let title = document.getElementById("formTitle")
let lang = document.getElementById("lang")
let theme = document.getElementById("theme")
let desc = document.getElementById("desc")
let btnCreate = document.getElementById("btnCreate")
let avatar = document.getElementById("avatar")

let clicked = 0

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


let avatarArr = []

let e = 0
iconLinks.forEach(element => {
    avatarArr.push(`<option data-img-src="${iconLinks[e]}" value="${e}"></option>`)
    e++
});

avatar.innerHTML = avatarArr.join(" ")

btnCreate.addEventListener('click', function() {

    if (
        clicked === 0 &&
        lang.value != 0 &&
        theme.value != 0 &&
        name.value &&
        title.value &&
        desc.value
    ) {
        document.getElementById("formScreen").style.display = "flex"
        clicked = 1
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(processData);
        } else {
            alert("Geolocation is not supported by this browser.")
        }
    } else {
        alert("Please, complete all the fields")
    }
})

function processData(position) {
    let key = ID()
    let lat = (position.coords.latitude)
    let lon = (position.coords.longitude)
    let aLat = lat + getRndInteger(1, 3)
    let aLon = lon + getRndInteger(1, 3)

    firebase.database().ref("rooms").child(key).set({
        name: name.value,
        title: title.value,
        lang: lang.value,
        theme: theme.value,
        desc: desc.value,
        lat: aLat,
        lon: aLon,
        key: key,
        avatar: avatar.value,
        date: Date.now()
    }, function(error) {
        if (error) {
            console.log(error);
        } else {
            window.location.href = "room.html?key=" + key
        }

    })
}

var ID = function() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

$("select").imagepicker()