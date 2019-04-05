//MODULES
const express = require('express')
const app = express()
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex');
const nodemailer = require('nodemailer');
const cryptoRandomString = require('crypto-random-string');

//CONTROLLERS
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const findface = require('./controllers/findface');
const confirmation = require('./controllers/confirmation');
const image = require('./controllers/image');

//DATABASE CONNECTION
const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port: 5433,
        user : 'Filip',
        password : '',
        database : 'smart-brain'
    }
});

// NODEMAILER
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'systemkfds@gmail.com',
        pass: 'nqdB75Xu8U2aRLi'
    },
    tls: {
        rejectUnauthorized: false
    }
});
var mailOptions = {
    from: 'System KFDS PWr <systemkfds@gmail.com>',
    to: '',
    subject: 'Potwierdzenie rejestracji',
    text: ''
};

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

//ROUTES
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/signin', (req, res) => signin.handleSignin(req,res,db,bcrypt))
app.post('/findface', (req, res) => findface.handleFindface(req,res))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt, cryptoRandomString, mailOptions, transporter))
app.get('/profile/:id', (req,res) => profile.handleProfile(res, res));
app.get('/confirmation/:verId', (req,res) => confirmation.handleConfirmation(req,res,db));
app.put('/image', (req, res) => image.handleImage(req,res,db));

//START LOG
app.listen(3000, () => console.log('Backend App listening on port 3000!'))
