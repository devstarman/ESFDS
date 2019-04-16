To jest projekt Elektronicznego Systemu Finansowania Działalności Studenckiej.

Instalacja:
1. Proszę pobrać repozytorium do lokalnego folderu.
2. Proszę wykonać instrukcję npm install.
3. Proszę zainstalować na lokalnym komputerze bazę postgresql i utworzyć tabele zgodnie z instrukcjami poniżej.
4. Proszę zaktualizować dane dostępowe do bazy postgresql w pliku back/server.js (zmienna db, która nawiązuje połączenie za pomocą knex).
5. Proszę uruchomić server (w folderze back polecenie npm start).
6. Proszę uruchomić aplikację (w folderze front polecenie npm start). Aplikacja jest domyślnie ustawiona do uruchomienia na porcie 3001, w przypadku konfliktów należy zmienić ustawienia w pliku front/package.json

"back" - zawiera serwer aplikacji napisany przy użyciu Node.JS
Projekt zawiera następujące endpointy:
users.handleGetUsers(req,res,db) - zwraca listę użytkowników
wnioski.handleGetWnioski(req,res,db) - zwraca listę złożonych wniosków
wnioski.handleShowEditApplication(req,res,db) - zwraca wniosek o zadanym id
wnioski.handlePostWnioski(req, res, db) - dodaje nowy wniosek do bazy danych na podstawie parametrów w req.body: userId, title, body
wnioski.handleUpdateApplication(req,res,db) - uaktualnia wniosek o zadanym id
authentication.handleAuthentication(req,res,db,bcrypt) - sprawdza czy użytkownik podał właściwe dane do logowania

"test-admin" - zawiera aplikację napisaną przy użyciu React.JS oraz react-admin
Projekt zawiera:
compononents - folder z komponentami użytymi w tworzeniu widoków
App.js - główny widok aplikacji, renderuje komponent <Admin> oraz komponenty pochodne <Resource> z listą użytkowników i listą wniosków
authProvider.js - klasa odpowiadająca za autentykację użytkowników podczas różnych czynności (logowanie, przełączanie między stronami, wylogowanie, zapytania do serwera)
dataProvider.js - klasa odpowiadająca za komunikację z serwerem
MyLoginPage.js - widok panelu logowania
Dashboard.js - widok panelu głównego


"back" - zawiera serwer aplikacji napisany przy u�yciu Node.JS
Projekt zawiera nast�puj�ce endpointy:
users.handleGetUsers(req,res,db) - zwraca list� u�ytkownik�w
wnioski.handleGetWnioski(req,res,db) - zwraca list� z�o�onych wniosk�w
wnioski.handleShowEditApplication(req,res,db) - zwraca wniosek o zadanym id
wnioski.handlePostWnioski(req, res, db) - dodaje nowy wniosek do bazy danych na podstawie parametr�w w req.body: userId, title, body
wnioski.handleUpdateApplication(req,res,db) - uaktualnia wniosek o zadanym id
authentication.handleAuthentication(req,res,db,bcrypt) - sprawdza czy u�ytkownik poda� w�a�ciwe dane do logowania

"test-admin" - zawiera aplikacj� napisan� przy u�yciu React.JS oraz react-admin
Projekt zawiera:
compononents - folder z komponentami u�ytymi w tworzeniu widok�w
App.js - g��wny widok aplikacji, renderuje komponent <Admin> oraz komponenty pochodne <Resource> z list� u�ytkownik�w i list� wniosk�w
authProvider.js - klasa odpowiadaj�ca za autentykacj� u�ytkownik�w podczas r�nych czynno�ci (logowanie, prze��czanie mi�dzy stronami, wylogowanie, zapytania do serwera)
dataProvider.js - klasa odpowiadaj�ca za komunikacj� z serwerem
MyLoginPage.js - widok panelu logowania
Dashboard.js - widok panelu g��wnego


Baza danych:
Aby aplikacja poprawnie działała należy założyć lokalnie bazę danych postgresql.
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



