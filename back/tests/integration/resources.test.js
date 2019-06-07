//app.post('/resources', (req, res) => resources.returnPermittedResources(req,res,db));

const request = require('supertest');
let server;

describe('Testy "Resources"',()=> {
    beforeEach(() => {
        server = require('../../server');
    });
    afterEach(() => {
        server.close();
    });

    describe('Testy GET /resources', () => {
        it(`powinno zwrocic kod 200`, async () => {
            const res = await request(server).post('/resources')
                .send({
                    roleId: 4
                });
            expect(res.status).toBe(200);
        });
        it(`powinno zwrocic wartosc zasobow dla admina`, async () => {
            const res = await request(server).post('/resources')
                .send({
                    roleId: 4
                });
            expect(res.body.resources).toBe('users, wnioski, organisations, organisationroles');
        });
    });
});