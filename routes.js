const express = require('express');
const router = express.Router();

const multer = require("multer");
const upload = multer();
// var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json();

const fs = require('fs')
const path = require('path');
const util = require('util')
const copyFile = util.promisify(fs.copyFile);

router.get('/', async function (req, res) {
    res.render('index')

})

router.post('/uploadqr', upload.none(), function (req, res) {
    
})

module.exports = router;