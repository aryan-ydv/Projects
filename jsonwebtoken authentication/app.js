var express = require('express');
const app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var dotenv = require('dotenv');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var flash = require('connect-flash');
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var welcomeRouter = require('./routes/welcome');
var bodyParser = require('body-parser');

const connectDB = require("./models/connection");
connectDB();

const banker = require('./routes/bankRouter');
const customer = require('./routes/customerRouter');
const teller = require('./routes/tellerRouter');
const account = require('./routes/accountRouter');
const loan = require('./routes/loanRouter');
const checking = require('./routes/checkingRouter');
const saving = require('./routes/savingRouter');


app.use('/banker/', banker);
app.use('/customer/', customer);
app.use('/teller/', teller);
app.use('/account/', account);
app.use('/loan/', loan);
app.use('/checking/', checking);
app.use('/saving/', saving);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



dotenv.config();
 
var strategy = new Auth0Strategy(
{
 domain: process.env.AUTH0_DOMAIN,
 clientID: process.env.AUTH0_CLIENT_ID,
 clientSecret: process.env.AUTH0_CLIENT_SECRET,
 callbackURL:process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/welcome'
},
function (accessToken, refreshToken, extraParams, profile, done) {
 return done(null, profile);
});
passport.use(strategy);

passport.serializeUser(function (user, done) {
 done(null, user);
});
passport.deserializeUser(function (user, done) {
 done(null, user);
});

app.get('/test', (req, res, next) => {
 res.send({ message: "Server is on" });
});
   
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(cookieParser());

var sess = {
 secret: 'CHANGE THIS SECRET',
 cookie: {},
 resave: false,
 saveUninitialized: true
};
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/welcome', welcomeRouter)
app.use(function (err, req, res, next) {
 res.status(err.status || 500);
 res.send({message: err.message,error: err});
});

app.listen(3000, () => {
 console.log("Server is runnig on port 3000");
});
module.exports = app;