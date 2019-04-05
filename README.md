To jest projekt Elektronicznego Systemu Finansowania Dzia³alnoœci Studenckiej.

Instalacja:
1. Proszê pobraæ repozytorium do lokalnego folderu.
2. Proszê wykonaæ instrukcjê npm install.
3. Proszê zainstalowaæ na lokalnym komputerze bazê postgresql i utworzyæ tabele zgodnie z instrukcjami poni¿ej.
4. Proszê zaktualizowaæ dane dostêpowe do bazy postgresql w pliku back/server.js (zmienna db, która nawi¹zuje po³¹czenie za pomoc¹ knex).
5. Proszê uruchomiæ server (w folderze back polecenie npm start).
6. Proszê uruchomiæ aplikacjê (w folderze front polecenie npm start). Aplikacja jest domyœlnie ustawiona do uruchomienia na porcie 3001, w przypadku konfliktów nale¿y zmieniæ ustawienia w pliku front/package.json

Baza danych:
Aby aplikacja poprawnie dzia³a³a nale¿y za³o¿yæ lokalnie bazê danych postgresql.
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



