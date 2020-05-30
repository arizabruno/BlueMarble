const express = require('express');

const app = express();

const port = 5000;

app.use(express.json());

function firstThreeSentences(text) {
    var j = 0;
    var r = '';
    for (var i = 0; i < text.length; i++) {
        if(text.charAt(i) === '.') {
            j++;
        }
        if(j === 3) {
            return r;
        }
        r += text.charAt(i);
      }
}

// Routes

app.get('/', (req, res) => {
    res.send('Home page');
});

const apodRouter = require('./routes/Apod');
app.use('/apod', apodRouter);

// Setting up the PORT

app.listen(port, () => { console.log(`Server is running on port ${port}`)});

