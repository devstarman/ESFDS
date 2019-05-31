const request = require('supertest');
// ladujemy path do servera
let server;

// funkcja describe sluzy to agregowania sobie testow danej funkcji/api
describe('Testy "ResetPassword"',()=>{
// funkcja ktora zostanie wywolana przed kazdym testem tej grupy
    beforeEach(()=>{
        server = require('../../server');
    });
    afterEach(()=>{
        server.close();
    });

    describe('Testy przy pomocy metody POST',()=>{
        it(`powinno zwrocic kod błędu`, async()=>{
            const res = await request(server).post('/resetpassword');
            expect(res.status).toBe(400);
        });
        it(`powinno zwrocic kod 200`, async()=>{
            const res = await request(server).post('/resetpassword');
            expect(res.status).toBe(200);
        });
    });
});
