const request = require('supertest');
// ladujemy path do servera
let server;

// funkcja describe sluzy to agregowania sobie testow danej funkcji/api
describe('Testy "Faculty"',()=>{
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
        it(`wydzial W-1 powinien posiadac id = 1`, async()=>{
            const res = await request(server).get('/faculties');
            expect(res.body.some(g=>(g.name==='W-1' && g.id===1))).toBeTruthy();
        });
        it(`Powinno zawierac wydzial W-5`, async()=>{
            const res = await request(server).get('/faculties');
            expect(res.body.some(g=>g.name==='W-5')).toBeTruthy();
        });
        it(`wydzial W-5 powinien posiadac id = 5`, async()=>{
            const res = await request(server).get('/faculties');
            expect(res.body.some(g=>(g.name==='W-5' && g.id===5))).toBeTruthy();
        });
        it(`Powinno zawierac wydzial W-10`, async()=>{
            const res = await request(server).get('/faculties');
            expect(res.body.some(g=>g.name==='W-10')).toBeTruthy();
        });
        it(`wydzial W-10 powinien posiadac id = 10`, async()=>{
            const res = await request(server).get('/faculties');
            expect(res.body.some(g=>(g.name==='W-10' && g.id===10))).toBeTruthy();
        });
    });
});
