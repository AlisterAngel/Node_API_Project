require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// setup mongoose
const mongoose = require('mongoose');
mongoose.connect(
  process.env.DB_URI,
  {
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
)
.catch(error => console.error(error));

// Add authentication modules
const passport = require('passport');
const session = require('express-session');
app.use(session({
  secret: "shh its a secret",
  resave: false,
  saveUninitialized: false
}));

// Setting up Passport
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Setup JWT strategy\
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTStrategy({
  secretOrKey: "shh its a secret",
  jwtFromRequest: ExtractJWT.fromExtractors([
    ExtractJWT.fromUrlQueryParameter('secret_token'),
    ExtractJWT.fromBodyField('secret_token')
  ])
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));

// requiring our routes
const routes = require('./routes');
const router = routes(express.Router());
app.use(router);

// adding error handling
const { handle404s, errorHandler } = require('./errorHandling');
app.use(handle404s);
app.use(errorHandler);

app.listen(
  process.env.PORT,
  () => console.log(`Listening on port ${process.env.PORT}`)
);