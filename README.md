To jest projekt Elektronicznego Systemu Finansowania Dzia�alno�ci Studenckiej.

Instalacja:
1. Prosz� pobra� repozytorium do lokalnego folderu.
2. Prosz� wykona� instrukcj� npm install.
3. Prosz� zainstalowa� na lokalnym komputerze baz� postgresql i utworzy� tabele zgodnie z instrukcjami poni�ej.
4. Prosz� zaktualizowa� dane dost�powe do bazy postgresql w pliku back/server.js (zmienna db, kt�ra nawi�zuje po��czenie za pomoc� knex).
5. Prosz� uruchomi� server (w folderze back polecenie npm start).
6. Prosz� uruchomi� aplikacj� (w folderze front polecenie npm start). Aplikacja jest domy�lnie ustawiona do uruchomienia na porcie 3001, w przypadku konflikt�w nale�y zmieni� ustawienia w pliku front/package.json

Baza danych:
Aby aplikacja poprawnie dzia�a�a nale�y za�o�y� lokalnie baz� danych postgresql.
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



