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

var QrScanner = require('qr-scanner');

router.get('/', async function (req, res) {
    res.render('index')

})

router.post('/uploadqr', upload.none(), async function (req, res) {
    const base64Data = req.body.image;
    fs.writeFile("test.png", base64Data, 'base64', function (err) {
        console.log('::'+err)
    })

    var buffer = fs.readFileSync('./test.png');
    console.log(buffer)

    // QrScanner.scanImage(buffer)
    //     .then(result => console.log('result'))
    //     .catch(error => console.log('No QR code found.'));
})

module.exports = router;