// library card records

// reference express
const express = require('express');
const app = express();

// import routes
const api = require('./routes/api');
app.use('/api',api);

// CONNECTING TO A MONGO DATABASE
// reference the mongoose module
let mongoose = require('mongoose');
// connect to database
let mongoDB = 'mongodb+srv://bdavis171:dustysice97@cluster0-wkxef.mongodb.net/cs_database?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
// connection error message
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// listen to server
const port = 1997;
const host = 'localhost';
app.listen(port, host, () => {
    console.log(`listening to port ${port}`);
});