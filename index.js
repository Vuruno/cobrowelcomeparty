const http = require('http');
const express = require('express');
const router = express.Router();
const app = express()
const path = require('path')
const expressLayouts = require('express-ejs-layouts');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

var logger = require('morgan');
var passport = require('passport');
var session = require('cookie-session');
const cookieParser = require('cookie-parser');

require('dotenv').config()

// Connect to MongoDB
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
app.use(express.json({ limit: '1mb' }))

// app.use(bodyparser.json({ limit: '50mb' }));
// app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));

// middlewares
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '/public')))

app.use(cookieParser('eskere'))

app.use(session({
  secret: 'eskere',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize())
app.use(passport.session())

const hostname = '127.0.0.1';
const port = process.env.PORT;
const server_host = '0.0.0.0';

app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', require('./routes/routes.js'))
app.use('/', require('./routes/auth.js'))

app.listen(port, server_host, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});