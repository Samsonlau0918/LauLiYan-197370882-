const express = require('express');
const BodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const databaseUrl = "mongodb+srv://admin:admin@cluster0-vcu2s.mongodb.net/Sora?retryWrites=true&w=majority";
const usersRoute = require('./routes/user_route');
const cardsRoute = require('./routes/card_route');
const myCardsRoute = require('./routes/my_card_route');
const commentRoute = require('./routes/comment_route');


const sess = {
    name: 'sess',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{ secure: false, maxAge: 1000*60*60*24*7}
};

const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(session(sess));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', usersRoute);
app.use('/', cardsRoute);
app.use('/', myCardsRoute);
app.use('/', commentRoute);

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/home.html');
});
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/header.html');
});
app.get('/user_info', (req,res) => {
    res.sendFile(__dirname + '/views/user_info.html');
});

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err)
        throw err;
});
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Connected port ' + PORT );
});
