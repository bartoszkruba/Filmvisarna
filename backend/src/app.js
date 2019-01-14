const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const Router = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(Router);





const startServer = async () => {
    await mongoose.connect('mongodb+srv://groupaccount:groupaccount1234@cluster0-ydy7f.mongodb.net/filmvisarna', {useNewUrlParser: true});
    app.listen(8081, () => {
        console.log('Listening on 8081');
    });
}

startServer();
