// app.get('/organisationroles', (req, res) => organisationrole.getManyFromDataProvider(req,res,db));
// app.get('/organisationroles/:id', (req, res) => organisationrole.getOrganisationRolesForUserId(req,res,db));

const request = require('supertest');
let server;

describe('Testy "organisationroles"',()=> {
    beforeEach(() => {
        server = require('../../server');
    });
    afterEach(() => {
        server.close();
    });

    describe('Testy GET /organisationroles', () => {
        it(`powinno zwrocic kod 200`, async () => {
            const res = await request(server).get('/organisationroles');
            expect(res.status).toBe(200);
        });
        it(`powinno zwrocic 6 elementow z bazy danych`, async () => {
            const res = await request(server).get('/organisationroles');
            expect(res.body.length).toBe(6);
        });
        it(`powinno zawierac id 1`, async () => {
            const res = await request(server).get('/organisationroles');
            expect(res.body.some(g => g.id === 1)).toBeTruthy();
        });
        it(`powinno zawierac id 3`, async () => {
            const res = await request(server).get('/organisationroles');
            expect(res.body.some(g => g.id === 3)).toBeTruthy();
        });
        it(`powinno zawierac id 6`, async () => {
            const res = await request(server).get('/organisationroles');
            expect(res.body.some(g => g.id === 6)).toBeTruthy();
        });
    });
});
