//app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt, cryptoRandomString, mailOptions, transporter));

const request = require('supertest');
let server;

describe('Testy "Register"',()=> {
    beforeEach(() => {
        server = require('../../server');
    });
    afterEach(() => {
        server.close();
    });

    describe('Testy POST /register', () => {
        it(`powinno zwrocic kod 200`, async () => {
            const res = await request(server).post('/register')
                .send({
                    name: 'F',
                    surname: 'O',
                    email: '000003@student.pwr.edu.pl',
                    mobilenumber: '123456789',
                    password: 'aaa',
                    orgNameId: 1,
                    orgRoleId: 1,
                    facultyId: 1
                });
            expect(res.status).toBe(200);
        });
        it(`powinno zawierac id 6`, async () => {
            const res = await request(server).post('/register')
                .send({
                    name: 'F',
                    surname: 'O',
                    email: '000004@student.pwr.edu.pl',
                    mobilenumber: '123456789',
                    password: 'aaa',
                    orgNameId: 1,
                    orgRoleId: 1,
                    facultyId: 1
                });
            expect(res.body.msg).toBe("Twoje konto zostało pomyślnie zarejestrowane.");
        });
    });
});