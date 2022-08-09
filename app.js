const http = require('http');
const express = require('express');
const router = express.Router();
const app = express()
const path = require('path')
const expressLayouts = require('express-ejs-layouts');
const bodyparser = require('body-parser');

// app.use(bodyparser.json({ limit: '50mb' }));
// app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));

// middlewares
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.urlencoded({extended: true})); 
// app.use(express.json());
app.use(express.static(path.resolve('./public')));

const hostname = '127.0.0.1';
const port = 2380;

app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }))
app.set('views', path.join(__dirname))
app.set('view engine', 'ejs')

app.use('/', require('./routes.js'))

app.listen(port, "0.0.0.0", hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});