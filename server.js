const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('./models/index');
const flash = require('connect-flash');
var User = mongoose.model('users');
var bodyParser = require('body-parser')
const session = require('express-session')

const users = require('./routes/users');
const diets = require('./routes/diets');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.Promise = global.Promise
app.use(bodyParser.json())

const db = require('./config/keys').mongoURI;
console.log(db, {
    useNewUrlParser: true
})
mongoose
    .connect(db)
    .then(() => {
        console.log('MONGODB connected');
    })
    .catch((err) => {
        console.log(err);
    })
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null
    next();
})

app.get('/',(req,res) => {
    res.send('INDEX Page')
})

app.use('/users', users);
app.use('/diets', diets);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))