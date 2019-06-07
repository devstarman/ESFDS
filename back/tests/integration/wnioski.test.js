// app.get('/wnioski', (req, res) => wnioski.handleGetWnioski(req, res, db));
// app.get('/wnioski/:id', (req, res) => wnioski.handleShowEditApplication(req,res,db));
// app.post('/wnioski', (req, res) => wnioski.handlePostWnioski(req, res, db));
// app.put('/wnioski/:id', (req,res) => wnioski.handleUpdateApplication(req,res,db));
// app.delete('/wnioski/:id', (req, res) => wnioski.handleDeleteWniosek(req,res,db));

const request = require('supertest');
let server;

describe('Testy "Wnioski"',()=> {
    beforeEach(() => {
        server = require('../../server');
    });
    afterEach(() => {
        server.close();
    });

    describe('Testy GET /wnioski', () => {
        it(`powinno zwrocic kod 200`, async () => {
            const res = await request(server).get('/wnioski');
            expect(res.status).toBe(200);
        });
        it(`powinno zwrocic 19 elementow z bazy danych`, async () => {
            const res = await request(server).get('/wnioski');
            expect(res.body.length).toBe(19);
        });
    });
});