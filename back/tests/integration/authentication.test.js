const request = require('supertest');
let server;

describe('Testy "Authentication"',()=>{
    beforeEach(()=>{
        server = require('../../server');
    });
    afterEach(()=>{
        server.close();
    });

    describe('Testy przy pomocy metody POST /authenticate',()=>{
        it(`poprawne logowanie - powinno zwrocic kod 200`, async()=>{
            const res = await request(server)
                .post('/authenticate')
                .send({username: "203368",
                      password: "haslo"});
            expect(res.status).toBe(200);
        });
        it(`poprawne logowanie - powinno zwrocic uzytkownika ktory jest zweryfikowany`, async()=>{
            const res = await request(server)
                .post('/authenticate')
                .send({username: "203368",
                    password: "haslo"});
            expect(res.body.isverified).toBe(true);
        });
        it(`bledne haslo - powinno zwrocic kod 400`, async()=>{
            const res = await request(server)
                .post('/authenticate')
                .send({username: "203368",
                    password: "h"});
            expect(res.status).toBe(400);
        });
        it(`bledne haslo - powinno zwrocic wiadomosc od serwera`, async()=>{
            const res = await request(server)
                .post('/authenticate')
                .send({username: "203368",
                    password: "h"});
            expect(res.body.msg).toBe("Niepoprawne dane logowania.");
        });
        it(`brak nazwy uzytkownika - powinno zwrocic kod 400`, async()=>{
            const res = await request(server)
                .post('/authenticate')
                .send({password: "203368"});
            expect(res.status).toBe(400);
        });
        it(`brak hasla - powinno zwrocic kod 400`, async()=>{
            const res = await request(server)
                .post('/authenticate')
                .send({username: "203368"});
            expect(res.status).toBe(400);
        });
        it(`uzytkownik niezweryfikowal maila - powinno zwrocic kod 400`, async()=>{
            const res = await request(server)
                .post('/authenticate')
                .send({username: "222222",
                    password: "haslo1234"});
            expect(res.status).toBe(400);
        });
        it(`uzytkownik niezweryfikowal maila - powinno zwrocic wiadomosc od serwera`, async()=>{
            const res = await request(server)
                .post('/authenticate')
                .send({username: "222222",
                    password: "haslo1234"});
            expect(res.body.msg).toBe("Nie potwierdzono adresu e-mail.");
        });
        it(`brak uzytkownika - powinno zwrocic kod 400`, async()=>{
            const res = await request(server)
                .post('/authenticate')
                .send({username: "123456",
                    password: "haslo1234"});
            expect(res.status).toBe(400);
        });
        it(`brak uzytkownika - powinno zwrocic wiadomosc od serwera`, async()=>{
            const res = await request(server)
                .post('/authenticate')
                .send({username: "123456",
                    password: "haslo1234"});
            expect(res.body.msg).toBe("Niepoprawne dane logowania.");
        });
    });
});
