To jest projekt Elektronicznego Systemu Finansowania DziaÅ‚alnoÅ›ci Studenckiej.

Instalacja:
1. ProszÄ™ pobraÄ‡ repozytorium do lokalnego folderu.
2. ProszÄ™ wykonaÄ‡ instrukcjÄ™ npm install.
3. ProszÄ™ zainstalowaÄ‡ na lokalnym komputerze bazÄ™ postgresql i utworzyÄ‡ tabele zgodnie z instrukcjami poniÅ¼ej.
4. ProszÄ™ zaktualizowaÄ‡ dane dostÄ™powe do bazy postgresql w pliku back/server.js (zmienna db, ktÃ³ra nawiÄ…zuje poÅ‚Ä…czenie za pomocÄ… knex).
5. ProszÄ™ uruchomiÄ‡ server (w folderze back polecenie npm start).
6. ProszÄ™ uruchomiÄ‡ aplikacjÄ™ (w folderze front polecenie npm start). Aplikacja jest domyÅ›lnie ustawiona do uruchomienia na porcie 3001, w przypadku konfliktÃ³w naleÅ¼y zmieniÄ‡ ustawienia w pliku front/package.json

"back" - zawiera serwer aplikacji napisany przy uÅ¼yciu Node.JS
Projekt zawiera nastÄ™pujÄ…ce endpointy:
users.handleGetUsers(req,res,db) - zwraca listÄ™ uÅ¼ytkownikÃ³w
wnioski.handleGetWnioski(req,res,db) - zwraca listÄ™ zÅ‚oÅ¼onych wnioskÃ³w
wnioski.handleShowEditApplication(req,res,db) - zwraca wniosek o zadanym id
wnioski.handlePostWnioski(req, res, db) - dodaje nowy wniosek do bazy danych na podstawie parametrÃ³w w req.body: userId, title, body
wnioski.handleUpdateApplication(req,res,db) - uaktualnia wniosek o zadanym id
authentication.handleAuthentication(req,res,db,bcrypt) - sprawdza czy uÅ¼ytkownik podaÅ‚ wÅ‚aÅ›ciwe dane do logowania

"test-admin" - zawiera aplikacjÄ™ napisanÄ… przy uÅ¼yciu React.JS oraz react-admin
Projekt zawiera:
compononents - folder z komponentami uÅ¼ytymi w tworzeniu widokÃ³w
App.js - gÅ‚Ã³wny widok aplikacji, renderuje komponent <Admin> oraz komponenty pochodne <Resource> z listÄ… uÅ¼ytkownikÃ³w i listÄ… wnioskÃ³w
authProvider.js - klasa odpowiadajÄ…ca za autentykacjÄ™ uÅ¼ytkownikÃ³w podczas rÃ³Å¼nych czynnoÅ›ci (logowanie, przeÅ‚Ä…czanie miÄ™dzy stronami, wylogowanie, zapytania do serwera)
dataProvider.js - klasa odpowiadajÄ…ca za komunikacjÄ™ z serwerem
MyLoginPage.js - widok panelu logowania
Dashboard.js - widok panelu gÅ‚Ã³wnego


"back" - zawiera serwer aplikacji napisany przy u¿yciu Node.JS
Projekt zawiera nastêpuj¹ce endpointy:
users.handleGetUsers(req,res,db) - zwraca listê u¿ytkowników
wnioski.handleGetWnioski(req,res,db) - zwraca listê z³o¿onych wniosków
wnioski.handleShowEditApplication(req,res,db) - zwraca wniosek o zadanym id
wnioski.handlePostWnioski(req, res, db) - dodaje nowy wniosek do bazy danych na podstawie parametrów w req.body: userId, title, body
wnioski.handleUpdateApplication(req,res,db) - uaktualnia wniosek o zadanym id
authentication.handleAuthentication(req,res,db,bcrypt) - sprawdza czy u¿ytkownik poda³ w³aœciwe dane do logowania

"test-admin" - zawiera aplikacjê napisan¹ przy u¿yciu React.JS oraz react-admin
Projekt zawiera:
compononents - folder z komponentami u¿ytymi w tworzeniu widoków
App.js - g³ówny widok aplikacji, renderuje komponent <Admin> oraz komponenty pochodne <Resource> z list¹ u¿ytkowników i list¹ wniosków
authProvider.js - klasa odpowiadaj¹ca za autentykacjê u¿ytkowników podczas ró¿nych czynnoœci (logowanie, prze³¹czanie miêdzy stronami, wylogowanie, zapytania do serwera)
dataProvider.js - klasa odpowiadaj¹ca za komunikacjê z serwerem
MyLoginPage.js - widok panelu logowania
Dashboard.js - widok panelu g³ównego


Baza danych:
Aby aplikacja poprawnie dziaÅ‚aÅ‚a naleÅ¼y zaÅ‚oÅ¼yÄ‡ lokalnie bazÄ™ danych postgresql.
Tabele:

CREATE TABLE public.login (
	id serial NOT NULL,
	hash varchar(100) NOT NULL,
	email text NOT NULL,
	CONSTRAINT login_email_key UNIQUE (email),
	CONSTRAINT login_pkey PRIMARY KEY (id)
);

CREATE TABLE public.users (
	id serial NOT NULL,
	"name" varchar(100) NULL,
	email text NOT NULL,
	entries int8 NULL DEFAULT 0,
	joined timestamp NOT NULL,
	isverified bool NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE public.login (
	id serial NOT NULL,
	hash varchar(100) NOT NULL,
	email text NOT NULL,
	CONSTRAINT login_email_key UNIQUE (email),
	CONSTRAINT login_pkey PRIMARY KEY (id)
);



