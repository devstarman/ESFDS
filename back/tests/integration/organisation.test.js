// app.get('/organisationTypes', (req, res) => organisations.getOrganisationTypes(req,res,db));
// app.post('/organisationNames', (req, res) => organisations.getOrganisationNames(req,res,db));
// app.post('/organisationRoles', (req, res) => organisations.getOrganisationRoles(req,res,db));
// app.get('/organisations', (req, res) => organisations.getManyFromDataProvider(req,res,db));


// ladujemy dev dependecy super test
const request = require('supertest');
// ladujemy path do servera
let server;

// funkcja describe sluzy to agregowania sobie testow danej funkcji/api
describe('Testy encji "OrganisationTypes"',()=>{
// funkcja ktora zostanie wywolana przed kazdym testem tej grupy
// w tym przypadku stawia tymczasowy serwer
    beforeEach(()=>{
        server = require('../../server');
    });

    // a ta po tescie - zamkniecie servera
    afterEach(()=>{
        server.close();
    });

    describe('Testy przy pomocy metody GET',()=>{
        it(`powinno zwrocic kod 200`, async()=>{
            const res = await request(server).get('/organisationTypes');
            expect(res.status).toBe(200);
        });
        it(`powinno zwrocic 6 elementow z bazy danych`, async()=>{
            const res = await request(server).get('/organisationTypes');
            expect(res.body.length).toBe(6);
        });
        it(`Nazwa organizacji nie powinna byc dluzsza niz 100 znakow`, async()=>{
            const res = await request(server).get('/organisationTypes');
            expect(res.body.some(g=>g.organisationtype.length<100)).toBeTruthy();
        });
    });
});