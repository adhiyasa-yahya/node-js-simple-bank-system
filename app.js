const express = require('express');
const bodyParser = require("body-parser");
const config = require('./config');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { connectdb, connecting, onError, connected, open, reconnected, disconnected } = require("./database/db.mongo")
const path = require('path')
const mongoose = require("mongoose");
const db = mongoose.connection;
const dbOptions = {
    dbName: config.MONGO_DBNAME
}

const authRouter = require('./routes/api/v1/auth');
const usersRouter = require('./routes/api/v1/users');
const trssRouter = require('./routes/api/v1/transaction');

const app = express();

db.on('connecting', connecting);
db.on('error', onError);
db.on('connected', connected);
db.once('open', open);
db.on('reconnected', reconnected);
db.on('disconnected', () => disconnected(config.MONGODB_REMOTE_URI, dbOptions));

main();

module.exports = app;

async function main() {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    await connectdb(config.MONGODB_REMOTE_URI, dbOptions);

    app.use(express.static('public'))

    app.use('/auth', authRouter);
    app.use('/user', usersRouter);
    app.use('/trs', trssRouter);
}
