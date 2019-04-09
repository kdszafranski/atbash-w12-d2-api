const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const axios = require('axios');
// load .env variables
require('dotenv').config();

// so many vars!
// console.log(process.env);

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.get('/giphyTrending', (req, res) => {
    
    let endpoint = `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=1`;
    
    // make request to Giphy API
    axios.get(endpoint)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.sendStatus(500);
        });
});

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});