// app.get('/users', (req, res) => users.getManyFromDataProvider(req, res, db));
// app.get('/users/:id', (req, res) => users.handleShowEditUser(req,res,db));
// app.put('/users/:id', (req,res) => users.handleUpdateUser(req,res,db));
// app.delete('/users/:id', (req, res) => users.handleDeleteUser(req,res,db));

const request = require('supertest');
let server;

describe('Testy "Users"',()=> {
    beforeEach(() => {
        server = require('../../server');
    });
    afterEach(() => {
        server.close();
    });

    describe('Testy GET /users', () => {
        it(`powinno zwrocic kod 200`, async () => {
            const res = await request(server).get('/users/24');
            expect(res.status).toBe(200);
        });
        it(`powinno zwrocic usera z id 24`, async () => {
            const res = await request(server).get('/users/24');
            expect(res.body.id).toBe(24);
        });
    });
});