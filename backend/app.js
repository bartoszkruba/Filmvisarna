const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/', (req, res, next)=>{
    res.send({
        message: 'Hello'
    })
});

app.get('/movies', (req, res, next)=>{
    res.send({
        movies: [
            'Batman',
            'Marry Poppins',
            'Clockwork Orange'
        ]
    })
});

app.listen(8081, () => {
    console.log('Listening on 8081');
});