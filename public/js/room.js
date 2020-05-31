function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

var callkey = getUrlVars()["key"];

function start() {
    var domain = "meet.jit.si";
    var options = {
        roomName: callkey,
        width: screen.width,
        height: screen.height * 0.8,
        parentNode: document.getElementById("anchor"),
        configOverwrite: {},
        interfaceConfigOverwrite: {
            RECENT_LIST_ENABLED: false,
            VIDEO_QUALITY_LABEL_DISABLED: true,
            SHOW_JITSI_WATERMARK: false,
            JITSI_WATERMARK_LINK: '',
            TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'chat',
            ],
        }
    }
    var api = new JitsiMeetExternalAPI(domain, options);
    api.executeCommand('toggleFilmStrip')
}

start()

let hang = document.getElementById("hang")

hang.addEventListener('click', function() {
    window.location.replace("index.html")
})