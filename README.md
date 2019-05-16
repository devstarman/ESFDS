# Elektroniczny System Finansowania  Działalności Studenckiej.

## Instalacja:
1. Proszę pobrać repozytorium do lokalnego folderu.
2. Proszę wykonać instrukcję npm install (zarówno w folderze back jak i test-admin).
3. Proszę zainstalować na lokalnym komputerze bazę postgresql i utworzyć tabele zgodnie z instrukcjami poniżej.
(polecane oprogramowanie do obsługi bazy PostgreSQL: DBeaver)
4. Proszę zaktualizować dane dostępowe do bazy postgresql w pliku back/server.js (zmienna db, która nawiązuje połączenie za pomocą knex).
5. Proszę uruchomić server (w folderze back polecenie npm start).
6. Proszę uruchomić aplikację (w folderze "test-admin" polecenie npm start). Aplikacja jest domyślnie ustawiona do uruchomienia na porcie 3001, w przypadku konfliktów należy zmienić ustawienia w pliku front/package.json

Najczęstsze problemy:
1) W pierwszej kolejności sprawdzić adresy IP servera, z którym łączy się frontend oraz dane dostępowe do bazy danych.
2) Do debuggowania frontendu bardzo przydatna jest konsola deweloperska w przeglądarce internetowej (w obecnej wersji frontend drukuje dużo logów).

Baza danych:
=======
## "back" - zawiera serwer aplikacji napisany przy użyciu Node.JS  
### Projekt zawiera następujące endpointy:  
users.handleGetUsers(req,res,db) - zwraca listę użytkowników  
wnioski.handleGetWnioski(req,res,db) - zwraca listę złożonych wniosków  
wnioski.handleShowEditApplication(req,res,db) - zwraca wniosek o zadanym id  
wnioski.handlePostWnioski(req, res, db) - dodaje nowy wniosek do bazy danych na podstawie parametrów w req.body: userId, title, body  
wnioski.handleUpdateApplication(req,res,db) - uaktualnia wniosek o zadanym id  
authentication.handleAuthentication(req,res,db,bcrypt) - sprawdza czy użytkownik podał właściwe dane do logowania  
  
## "test-admin" - zawiera aplikację napisaną przy użyciu React.JS oraz react-admin  
### Projekt zawiera:  
compononents - folder z komponentami użytymi w tworzeniu widoków  
App.js - główny widok aplikacji, renderuje komponent <Admin> oraz komponenty pochodne <Resource> z listą użytkowników i listą wniosków  
authProvider.js - klasa odpowiadająca za autentykację użytkowników podczas różnych czynności (logowanie, przełączanie między stronami, wylogowanie, zapytania do serwera)  
dataProvider.js - klasa odpowiadająca za komunikację z serwerem  
MyLoginPage.js - widok panelu logowania  
Dashboard.js - widok panelu głównego  

## Baza danych:
Aby aplikacja poprawnie działała należy założyć lokalnie bazę danych postgresql.
Tabele zapisane w pliku "baza-sql.txt"

## Dokumentacja zależności:
Przed edycją frontendu warto przeczytać tutoriale:
1) React: https://reactjs.org/tutorial/tutorial.html
2) React-Admin: https://marmelab.com/react-admin/Tutorial.html
Dokumentację:
1) React: https://reactjs.org/docs/getting-started.html
2) React-Admin: https://marmelab.com/react-admin/index.html


