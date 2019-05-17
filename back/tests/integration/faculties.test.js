const request = require('supertest');
// ladujemy path do servera
let server;

// funkcja describe sluzy to agregowania sobie testow danej funkcji/api
describe('Testy encji "Faculties"',()=>{
// funkcja ktora zostanie wywolana przed kazdym testem tej grupy
    beforeEach(()=>{
        server = require('../../server');
    });
    afterEach(()=>{
        server.close();
    });

    describe('Testy przy pomocy metody GET',()=>{
        it(`powinno zwrocic kod 200`, async()=>{
            const res = await request(server).get('/faculties');
            expect(res.status).toBe(200);
        });
        it(`powinno zwrocic 3 elementy z bazy danych`, async()=>{
            const res = await request(server).get('/faculties');
            expect(res.body.length).toBe(3);
        });
        it(`Powinno zawierac wydzial W-1`, async()=>{
            const res = await request(server).get('/faculties');
            expect(res.body.some(g=>g.name==='W-1')).toBeTruthy();
        });
    });
});
