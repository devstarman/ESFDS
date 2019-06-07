// app.get('/konkursy', (req, res) => konkursy.handleGetKonkursy(req, res, db));
// app.get('/konkursy/:id', (req, res) => konkursy.handleShowEditKonkurs(req,res,db));
// app.put('/konkursy/:id', (req,res) => konkursy.handleUpdateKonkurs(req,res,db));
// app.post('/konkursy', (req, res) => konkursy.handlePostKonkurs(req, res, db));
// app.delete('/konkursy/:id', (req, res) => konkursy.handleDeleteKonkurs(req,res,db));
// app.get('/typykonkursow', (req, res) => konkursy.getManyKonkursyTypesFromDataProvider(req, res, db));

const request = require('supertest');
let server;

describe('Testy "Konkursy"',()=>{
    beforeEach(()=>{
        server = require('../../server');
    });
    afterEach(()=>{
        server.close();
    });

    describe('Testy GET /konkursy',()=>{
        it(`powinno zwrocic kod 200`, async()=>{
            const res = await request(server).get('/konkursy');
            expect(res.status).toBe(200);
        });
        it(`powinno zwrocic 4 elementy z bazy danych`, async()=>{
            const res = await request(server).get('/konkursy');
            expect(res.body.length).toBe(4);
        });
        it(`powinno zawierac id 6`, async()=>{
            const res = await request(server).get('/konkursy');
            expect(res.body.some(g=>g.id===6)).toBeTruthy();
        });
        it(`powinno zawierac id 13`, async()=>{
            const res = await request(server).get('/konkursy');
            expect(res.body.some(g=>g.id===13)).toBeTruthy();
        });
        it(`powinno zawierac autorid 21`, async()=>{
            const res = await request(server).get('/konkursy');
            expect(res.body.some(g=>g.autorid===21)).toBeTruthy();
        });
    });
    describe('Testy GET /konkursy with filter id = 6',()=> {
        it(`powinno zwrocic kod 200`, async () => {
            const res = await request(server).get('/konkursy?filter=%7B%22id%22%3A%5B6%5D%7D'); //{"id":[6]}
            expect(res.status).toBe(200);
        });
        it(`powinno zwrocic 1 element z bazy danych`, async () => {
            const res = await request(server).get('/konkursy?filter=%7B%22id%22%3A%5B6%5D%7D'); //{"id":[6]}
            expect(res.body.length).toBe(1);
        });
    });
    describe('Testy GET /konkursy with filter id = 0',()=> {
        it(`powinno zwrocic kod 200`, async () => {
            const res = await request(server).get('/konkursy?filter=%7B%22id%22%3A%5B0%5D%7D'); //{"id":[0]}
            expect(res.status).toBe(200);
        });
        it(`powinno zwrocic 0 elementow z bazy danych`, async () => {
            const res = await request(server).get('/konkursy?filter=%7B%22id%22%3A%5B0%5D%7D'); //{"id":[0]}
            expect(res.body.length).toBe(0);
        });
    });
    describe('Testy GET /konkursy/:id with id = 6',()=> {
        it(`powinno zwrocic kod 200`, async () => {
            const res = await request(server).get('/konkursy/6');
            expect(res.status).toBe(200);
        });
        it(`powinno zawierac id 6`, async()=>{
            const res = await request(server).get('/konkursy/6');
            expect(res.body.id).toBe(6);
        });
    });
    describe('Testy GET /konkursy/:id with id = 0',()=> {
        it(`powinno zwrocic kod 400`, async () => {
            const res = await request(server).get('/konkursy/0');
            expect(res.status).toBe(400);
        });
        it(`powinno zwrocic wiadomosc serwera`, async()=>{
            const res = await request(server).get('/konkursy/0');
            expect(res.body).toBe("[EditForm] Konkurs not found!");
        });
    });

    describe('Testy przy pomocy metody UPDATE /konkursy',()=> {
        it(`niepoprawne id - powinno zwrocic kod 400`, async () => {
            const res = await request(server)
                .put('/konkursy/idesf')
                .send({
                    aaa: 'aaa'
                });
            expect(res.status).toBe(400);
        });
        it(`brak danych - powinno zwrocic kod 400`, async () => {
            const res = await request(server)
                .put('/konkursy/55')
                .send({
                    aaa: 'aaa'
                });
            expect(res.status).toBe(400);
        });
        it(`brak danych - powinno zwrocic wiadomosc od serwera`, async () => {
            const res = await request(server)
                .put('/konkursy/55')
                .send({
                    aaa: 'aaa'
                });
            expect(res.body.msg).toBe("Proszę podać wszystkie dane.");
        });
        it(`niepoprawne dane - powinno zwrocic kod 400`, async () => {
            const res = await request(server)
                .put('/konkursy/55')
                .send({
                    komisjaid: 5,
                    typkonkursu: 1,
                    czasrozpoczecia: 'czasrozpoczecia',
                    czaszakonczenia: 'czaszakonczenia'
                });
            expect(res.status).toBe(400);
        });
        it(`niepoprawne dane - powinno zwrocic wiadomosc od serwera`, async () => {
            const res = await request(server)
                .put('/konkursy/55')
                .send({
                    komisjaid: 5,
                    typkonkursu: 1,
                    czasrozpoczecia: 'czasrozpoczecia',
                    czaszakonczenia: 'czaszakonczenia'
                });
            expect(res.body).toBe("[UpdateKonkursForm] Konkurs update error!");
        });
        it(`poprawne dane, zle id - powinno zwrocic wiadomosc serwera`, async () => {
            const res = await request(server)
                .put('/konkursy/55')
                .send({
                    komisjaid: 5,
                    typkonkursu: 1,
                    czasrozpoczecia: '2019-06-13T06:00:00.000Z',
                    czaszakonczenia: '2019-06-13T06:00:00.000Z'
                });
            expect(res.body).toBe("[UpdateKonkursForm] Konkurs update error!");
        });
        it(`poprawne dane, zle id - powinno zwrocic kod 400`, async () => {
            const res = await request(server)
                .put('/konkursy/55')
                .send({
                    komisjaid: 5,
                    typkonkursu: 1,
                    czasrozpoczecia: '2019-06-13T06:00:00.000Z',
                    czaszakonczenia: '2019-06-13T06:00:00.000Z'
                });
            expect(res.status).toBe(400);
        });
        it(`poprawne dane - powinno zwrocic kod 200`, async () => {
            const res = await request(server)
                .put('/konkursy/13')
                .send({
                    komisjaid: 5,
                    typkonkursu: 1,
                    czasrozpoczecia: '2019-06-13T06:00:00.000Z',
                    czaszakonczenia: '2019-06-13T06:00:00.000Z'
                });
            expect(res.status).toBe(200);
        });
        it(`poprawne dane - powinno zwrocic zapisany konkurs`, async () => {
            const res = await request(server)
                .put('/konkursy/13')
                .send({
                    komisjaid: 5,
                    typkonkursu: 1,
                    czasrozpoczecia: '2019-06-13T06:00:00.000Z',
                    czaszakonczenia: '2019-06-13T06:00:00.000Z'
                });
            expect(res.body.id).toBe(13);
        });
    });

    describe('Testy przy pomocy metody POST /konkursy',()=> {
        it(`brak danych - powinno zwrocic kod 400`, async () => {
            const res = await request(server)
                .post('/konkursy')
                .send({
                    aaa: 'aaa'
                });
            expect(res.status).toBe(400);
        });
        it(`brak danych - powinno zwrocic wiadomosc od serwera`, async () => {
            const res = await request(server)
                .post('/konkursy')
                .send({
                    aaa: 'aaa'
                });
            expect(res.body.msg).toBe("Proszę podać wszystkie dane.");
        });
        it(`niepoprawne dane - powinno zwrocic kod 400`, async () => {
            const res = await request(server)
                .post('/konkursy')
                .send({
                    authorId: 21,
                    komisjaid: 5,
                    typkonkursu: 1,
                    czasrozpoczecia: 'czasrozpoczecia',
                    czaszakonczenia: 'czaszakonczenia'
                });
            expect(res.status).toBe(400);
        });
        it(`niepoprawne dane - powinno zwrocic wiadomosc od serwera`, async () => {
            const res = await request(server)
                .post('/konkursy')
                .send({
                    authorId: 21,
                    komisjaid: 5,
                    typkonkursu: 1,
                    czasrozpoczecia: 'czasrozpoczecia',
                    czaszakonczenia: 'czaszakonczenia'
                });
            expect(res.body).toBe("Error saving to database.");
        });
        it(`poprawne dane - powinno zwrocic kod 200`, async () => {
            const res = await request(server)
                .post('/konkursy')
                .send({
                    authorId: 21,
                    komisjaid: 5,
                    typkonkursu: 1,
                    czasrozpoczecia: '2019-06-13T06:00:00.000Z',
                    czaszakonczenia: '2019-06-13T06:02:00.000Z'
                });
            await request(server).delete(`/konkursy/${res.body}`);
            expect(res.status).toBe(200);
        });
        it(`poprawne dane - powinno zwrocic id konkursu`, async () => {
            const res = await request(server)
                .post('/konkursy')
                .send({
                    authorId: 21,
                    komisjaid: 5,
                    typkonkursu: 1,
                    czasrozpoczecia: '2019-06-13T06:00:00.000Z',
                    czaszakonczenia: '2019-06-13T06:02:00.000Z'
                });
            await request(server).delete(`/konkursy/${res.body}`);
            expect(!isNaN(res.body)).toBeTruthy();
        });
    });
    describe('Testy przy pomocy metody DELETE /konkursy/:id',()=> {
        it(`niepoprawne id - powinno zwrocic kod 400`, async () => {
            const res = await request(server)
                .delete('/konkursy/ead');
            expect(res.status).toBe(400);
        });
        it(`niepoprawne id - powinno zwrocic wiadomosc serwera`, async () => {
            const res = await request(server)
                .delete('/konkursy/ead');
            expect(res.body.msg).toBe("Niepoprawne ID.");
        });
        it(`poprawne id - powinno zwrocic kod 200`, async () => {
            const res = await request(server)
                .delete('/konkursy/98');
            await request(server).post('/konkursy/98').send({
                authorId: 21,
                komisjaid: 5,
                typkonkursu: 1,
                czasrozpoczecia: '2019-06-13T06:00:00.000Z',
                czaszakonczenia: '2019-06-13T06:02:00.000Z'
            });
            expect(res.status).toBe(200);
        });
        it(`poprawne id - powinno zwrocic id konkursu`, async () => {
            const res = await request(server)
                .delete('/konkursy/99');
            await request(server).post('/konkursy/99').send({
                authorId: 21,
                komisjaid: 5,
                typkonkursu: 1,
                czasrozpoczecia: '2019-06-13T06:00:00.000Z',
                czaszakonczenia: '2019-06-13T06:02:00.000Z'
            });
            expect(res.body.id).toBe(99);
        });
    });

});
