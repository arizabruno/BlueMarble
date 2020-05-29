const router = require('express').Router();
const fetch = require('node-fetch');

// Getting the APOD Json object

router.route('/').get((req, res) => {
    let apiKey = 'sV6GZxy33Ie3IDPsXyIdBqkhkYyiFXf6LYkDONCm';
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    // console.log(url);
    let settings = {method: "Get"};
    fetch(url, settings).then(result => result.json()).then((json) => {
        //console.log(json.url);
        res.json(json.url);
    });
});



module.exports = router;