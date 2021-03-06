//MODULES
const express = require('express')
const app = express()
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex');
const nodemailer = require('nodemailer');
const cryptoRandomString = require('crypto-random-string');

//DATABASE CONNECTION
const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port: 5433,
        user : 'Filip',
        password : '',
        database : 'kfds'
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

//CONTROLLERS
const register = require('./controllers/register');
const authentication = require('./controllers/authentication');
const confirmation = require('./controllers/confirmation');
const users = require('./controllers/users');
const wnioski = require('./controllers/wnioski');
const resources = require('./controllers/resources');
const organisations = require('./controllers/organisation');
const faculties = require('./controllers/faculty');
const organisationrole = require('./controllers/organisationrole');
const resetpassword = require('./controllers/resetpassword');
const konkursy = require('./controllers/konkursy');
const profile = require('./controllers/profile');

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

//ROUTES
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/users', (req, res) => users.getManyFromDataProvider(req, res, db));
app.get('/users/:id', (req, res) => users.handleShowEditUser(req,res,db));
app.put('/users/:id', (req,res) => users.handleUpdateUser(req,res,db));
app.delete('/users/:id', (req, res) => users.handleDeleteUser(req,res,db));
app.get('/wnioski', (req, res) => wnioski.handleGetWnioski(req, res, db));
app.get('/wnioski/:id', (req, res) => wnioski.handleShowEditApplication(req,res,db));
app.post('/wnioski', (req, res) => wnioski.handlePostWnioski(req, res, db));
app.put('/wnioski/:id', (req,res) => wnioski.handleUpdateApplication(req,res,db));
app.delete('/wnioski/:id', (req, res) => wnioski.handleDeleteWniosek(req,res,db));
app.post('/authenticate', (req,res) => authentication.handleAuthentication(req,res,db,bcrypt));
app.post('/resources', (req, res) => resources.returnPermittedResources(req,res,db));
app.get('/organisationTypes', (req, res) => organisations.getOrganisationTypes(req,res,db));
app.post('/organisationNames', (req, res) => organisations.getOrganisationNames(req,res,db));
app.post('/organisationRoles', (req, res) => organisations.getOrganisationRoles(req,res,db));
app.get('/faculties', (req, res) => faculties.getFaculties(req,res,db));
app.get('/organisations', (req, res) => organisations.getManyFromDataProvider(req,res,db));
app.get('/organisationroles', (req, res) => organisationrole.getManyFromDataProvider(req,res,db));
app.get('/organisationroles/:id', (req, res) => organisationrole.getOrganisationRolesForUserId(req,res,db));
app.post('/resetpassword', (req,res) => resetpassword.handleResetPassword(req, res, db, cryptoRandomString, bcrypt, mailOptions, transporter));
app.get('/konkursy', (req, res) => konkursy.handleGetKonkursy(req, res, db));
app.get('/konkursy/:id', (req, res) => konkursy.handleShowEditKonkurs(req,res,db));
app.put('/konkursy/:id', (req,res) => konkursy.handleUpdateKonkurs(req,res,db));
app.post('/konkursy', (req, res) => konkursy.handlePostKonkurs(req, res, db));
app.post('/konkursy/:id', (req, res) => konkursy.handlePostKonkursWithId(req, res, db));
app.delete('/konkursy/:id', (req, res) => konkursy.handleDeleteKonkurs(req,res,db));
app.get('/typykonkursow', (req, res) => konkursy.getManyKonkursyTypesFromDataProvider(req, res, db));
app.get('/profile/:id', (req, res) => profile.handleGetProfile(req,res,db));
app.put('/profile/:id', (req,res) => profile.handleUpdateProfile(req,res,db,bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt, cryptoRandomString, mailOptions, transporter));
app.get('/confirmation/:verId', (req,res) => confirmation.handleConfirmation(req,res,db));

// server musial byc wyeksportowany
//START LOG
const server = app.listen(3000, () => console.log('Backend App listening on port 3000!'));

module.exports = server;
