const router = require('express').Router();
const fetch = require('node-fetch');

function firstThreeSentences(text) {
    var j = 0;
    var r = '';
    for (var i = 0; i < text.length; i++) {
        if(text.charAt(i) === '.') {
            j++;
        }
        r += text.charAt(i);
        if(j === 3) {
            return r;
        }
      }
}

// Getting the APOD Json object

router.route('/imgurl').get((req, res) => {
    let apiKey = 'sV6GZxy33Ie3IDPsXyIdBqkhkYyiFXf6LYkDONCm';
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    let settings = {method: "Get"};
    fetch(url, settings).then(result => result.json()).then((json) => {
        //console.log(json.url);
        res.json(json.url);
    });
});

router.route('/description').get((req, res) => {
    let apiKey = 'sV6GZxy33Ie3IDPsXyIdBqkhkYyiFXf6LYkDONCm';
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    let settings = {method: "Get"};
    fetch(url, settings).then(result => result.json()).then((json) => {
        text = json.explanation;
        shortText = firstThreeSentences(text);
        res.json(shortText);
    });
});


module.exports = router;