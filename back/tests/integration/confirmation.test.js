const request = require('supertest');
let server;

describe('Testy "Confirmation"',()=>{
    beforeEach(()=>{
        server = require('../../server');
    });
    afterEach(()=>{
        server.close();
    });

    describe('Testy przy pomocy metody GET /confirmation/:verId',()=>{
        it(`poprawny kod weryfikacji - powinno zwrocic kod 200`, async()=>{
            const res = await request(server)
                .get('/confirmation/09a45cd7195c80a3e815');
            expect(res.status).toBe(200);
        });
        it(`poprawny kod weryfikacji - powinno zwrocic wiadomosc o sukcesie`, async()=>{
            const res = await request(server)
                .get('/confirmation/09a45cd7195c80a3e815');
            expect(res.body).toBe('Weryfikacja udana.');
        });
        it(`bledny kod weryfikacji - powinno zwrocic kod 400`, async()=>{
            const res = await request(server)
                .get('/confirmation/aaaa');
            expect(res.status).toBe(400);
        });
        it(`bledny kod weryfikacji - powinno zwrocic wiadomosc o bledzie`, async()=>{
            const res = await request(server)
                .get('/confirmation/aaaa');
            expect(res.body).toBe('Weryfikacja nieudana. Zły link weryfikacji.');
        });
    });
});
