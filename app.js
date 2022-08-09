const http = require('http');
const express = require('express');
const router = express.Router();
const app = express()
const path = require('path')
const expressLayouts = require('express-ejs-layouts');

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