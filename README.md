# Coders Camp 2020 | Projekt Zespołowy | Node.js
 
 ## Spis treści
 
 - Projekt — Zespół projektowy
 - Podział zadań
 - Projekt — Node.js
 - Technologia projektu
 - Przegląd projektu
 - Funkcjonalności
 - Dostępne skrypty
 
 ### Zespół projektowy
 
 Zespół pracował w ramach kursu [CodersCamp](CodersCamp.pl).
 Aplikację wykonali uczestnicy kursu przy pomocy mentora.
 Zachęcamy do odwiedzenia profili członków zespołu, w celu zapoznania się z ich portfolio.

**Mentor**: 
- [Grzegorz Sztuczyński](https://github.com/farce1)
- Michał Skorzec

**Uczestnicy**:

- [Justyna Sobczak](https://github.com/s-justina) (Tech Lead)
- [Natalia Dębska](https://github.com/talcia) (Development Manager)
- Paulina Kolasa (Product Owner)
- Agata Saczek (Product Owner)
- Michał Stępień (Development Manager)
- [Olaf Koziara](https://github.com/Olaf-Koziara) (Tech Lead)
- [Miron Weltrowski](https://github.com/miron54) (Tech Lead)

### Podział zadań:

W trakcie trwania projektu wyznaczono w zespole odpowiednie funkcje:

##### Tech Lead - Justyna, Miron, Olaf

Ostateczne zdanie w kwestiach związanych z technologią należy do Tech Lead'a.
Tech Lead przeprowadza Code Review zadań, dzięki czemu zespół unika błędów projektowych.
Wspiera zespół techniczną radą przez co praca idzie szybko i sprawnie.

##### Product Owner - Agata, Paulina

Wizja produktu i kwestie związane z funkcjonalnościami to zadanie dla Product Owner'a.
Prowadzi zespół zgodnie z wymaganiami klienta oraz rozwiewa wszelkie wątpliwości 
związane z założeniami projektowymi.

##### Development Manager - Natalia, Michał

Koordynacja zespołem nieustannie kontrolowana.
Development Manager odpowiada za podział zadań oraz kontrolę jakości pracy.
Przeprowadza codzienne daily, dzięki czemu zespół pracuje w harmonii.

### Projekt — Node.js

Projekt powstał w ramach kursu CodersCamp 2020. Jest to czwarty projekt
z serii projektów, które są realizowane podczas kursu.
Ma on charakter zespołowy.
Celem projektu jest wykonanie backendu aplikacji webowej.

### Technologia projektu

Projekt powstał w Node.js w oparciu o framework Express.js.
W trakcie realizacji projektu posłużono się dodatkowymi narzędziami w celu zoptymalizowania
pracy całego zespołu.
Wszelkie schematy działań związanych z projektem, systematycznie mapowano na tablicy miro.

Wykonanie backendu aplikacji objęło niżej wymienione zagadnienia, w celu ich utrwalenia:

- REST API
- zakładanie konta użytkownika
- autoryzacja i autentykacja użytkownika, różne uprawnienia. Wykorzystanie Json Web Token.
- wykorzystanie bazy danych (MongoDB)
- integracja z jakimś zewnętrznym systemem (np. wysyłanie e-maili)
- pisanie testów

## Przegląd projektu

Aplikacja "Co otwarte" to pandemiczna platforma otwartych restauracji w Polsce.
Poinformuje ona osoby głodne wrażeń, które restauracje w ich mieście (i nie tylko)
są otwarte w czasach pandemii. Zalogowanym użytkownikom pozwala na wyszukanie restauracji
w celu sprawdzenia jej aktualnego statusu. Natomiast restauratorom pozwala na poinformanie 
potencjalnych klientów o otwarciu restauracji, co przełoży się na większe zainteresowanie
z ich strony. Restauratorzy moga poinformować również o zamknięciu restauracji, co pozwoli 
uniknąć niemiłych komentarzy ze strony osób, które nieświadomie znajdą się pod drzwiami 
zamknietej restauracji. 


## Funkcjonalności:
1. Użytkownik może zarejestrować się w systemie, podając imię, nazwisko, hasło i adres e-mail.
2. Użytkownik może zalogować się w systemie, podając adres e-mail i hasło.
3. Użytkownik moze zmienić dane swojego konta.
4. Użytkownik moze usunąć swoje konto.
5. Użytkownik może dodać daną restauracje do ulubionych.
6. Użytkownik może usunąć daną restauracje z ulubionych.
7. Zalogowani użytkownicy mogą przeglądać restauracje.
8. Użytkownik może stworzyć restauracje podając nazwe, adres e-mail, adres.
9. Użytkownik może zmienić status restauracji, która nie posiada właściciela.
10. Użytkownik może ubiegać się o rolę właściciela restauracji.
11. Właściciel restauracji może zmienić dane swojej restauracji.
12. Właściciel restauracji może usunąć swoją restaurację.
13. Admin posiada dostęp do wszystkich akcji (dodawanie, usuwanie, edycja) uzytkownika i restauracji.


## Dostępne skrypty

Po sklonowaniu bieżącego projektu pamiętaj, aby
uruchomić `npm install`, aby zainstalować wszystkie zależności.

#### Uruchomienie projektu

Projekt możesz uruchomić za pomocą komendy:

`npm run dev`

Otwórz adres [http://localhost:8080/
](/http://localhost:8080/), aby wyświetlić go w przeglądarce.

#### Uruchomienie testów

Aby uruchomić testy aplikacji, wykonaj następujące kroki:

1. Zainstaluj zależności za pomocą komendy: `npm install` (jeśli nie zrobiłeś już tego wcześniej).
1. Uruchom testy, wykonując komendę: `npm run test`. 

