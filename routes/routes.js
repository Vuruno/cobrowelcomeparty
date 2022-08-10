const express = require('express');
const router = express.Router();
const { isntLoggedIn, isLoggedIn } = require('../settings/isAuth')
const Pagado = require('../models/Pagado')

// const multer = require("multer");
// const upload = multer();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

const studentsdb = require('../students.json')

function getOneStudent(cip) {

    var a = 0
    var b = studentsdb.length - 1
    var x, xCip
    do {
        x = parseInt((a + b) / 2)
        xCip = studentsdb[x].CIP
        if (xCip < cip) {
            a = x;
        } else if (xCip > cip) {
            b = x;
        }
    } while (xCip != cip && a != b)

    if (xCip != cip)
        return null
    return studentsdb[x]
}

const fs = require('fs')
const path = require('path');
const util = require('util')
const copyFile = util.promisify(fs.copyFile);

var QrScanner = require('qr-scanner');

router.get('/', async function (req, res) {
    res.render('index')
})

router.get('/cobrar', isLoggedIn, async function (req, res) {
    res.redirect('/cobrar/manual')
})

router.get('/cobrar/:id', isLoggedIn, async function (req, res) {
    let qr = req.params.id == 'qr' ? 'qr' : 'false'
    res.render('cobro', { qr: qr })
})

router.get('/lista', async function (req, res) {
    res.redirect('/lista/pagados')
})

router.get('/lista/:status', async function (req, res) {
    let status = req.params.status.split("=")
    res.render('lista', { status: status[0], nombre: status[1] })
})

router.post('/uploadqr', isLoggedIn, jsonParser, async function (req, res) {
    var cip = req.body.CIP;
    cip = Number(cip)

    const student = getOneStudent(cip)
    if (student)
        console.log(student['COMPLETE NAME'])

    res.end(JSON.stringify(student))
})

router.post('/nuevoPago', jsonParser, async function (req, res) {

    const pago = req.body
    pago.CIP = Number(pago.CIP)
    pago.Entradas = Number(pago.Entradas)
    pago.Fecha = new Date()
    pago.Cobrador = req.user.username

    var pagados = require('../pagados.json')
    let add = true

    var aux = await Pagado.findOne({ CIP: pago.CIP })
    console.log(aux)
    if (aux == null)
        add = false

    if (add) {
        const savePago = new Pagado(pago)
        await savePago.save()
        // pagados.push(pago)
        // fs.writeFileSync('pagados.json', JSON.stringify(pagados))
        res.redirect(`/lista/agregado=${pago.Nombre}`)
    } else {
        res.redirect(`/lista/error=${pago.Nombre}`)
    }
})

module.exports = router;