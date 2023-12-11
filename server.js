const express = require('express');
const app = express();

app.use(express.json() );

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('error', err => console.error(err) );
db.once('open', () => console.log('Подключено к СУБД') );

app.use('/v2', require('./v2') ); // одинаковое начало маршрутов

app.listen(3000, () => console.log('http://localhost:3000') );
