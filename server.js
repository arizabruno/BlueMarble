const express = require('express');

const app = express();

const port = 5000;

app.use(express.json());

// Routes

app.get('/', (req, res) => {
    res.send('Home page');
});

const apodRouter = require('./routes/Apod');
app.use('/apod', apodRouter);

// Setting up the PORT

app.listen(port, () => { console.log(`Server is running on port ${port}`)});

