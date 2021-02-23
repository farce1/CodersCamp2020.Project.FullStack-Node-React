# CodersCamp 2020 - Projekt końcowy (FullStack — Node.js + React)
**CodersCamp (coderscamp.edu.pl) - Największy otwarty kurs programowania webowego** 

### Wprowadzenie
Gratulacje! 
Udało Wam się dotrzeć prawie do końca kursu. 
Posiadacie już wiele umiejętności, które są konieczne, aby rozpocząć karierę programisty.
W trakcie tego projektu powinniście dowieść, że jesteście gotowi wykonywać kompletne aplikacje webowe.
Wraz ze zbieraniem wymagań, dzieleniem pracy, zarządzaniem, całym procesem wytwórczym, testowaniem oraz wdrażaniem.

### Zasady wykonywania projektu (wspólne dla wszystkich grup i mentorów): 

##### W projekcie każdy z uczestników powinien zaprezentować praktyczną znajomość poniższych zagadnień związanych z Node.js i React:

**Node.js / Express**
- REST API
- zakładanie konta użytkownika
- autoryzacja i autentykacja użytkownika, różne uprawnienia. Wykorzystanie Json Web Token.
- wykorzystanie bazy danych (NoSQL lub SQL)
- integracja z jakimś zewnętrznym systemem (np. wysyłanie e-maili)
- pisanie testów

**React**
- Komunikacja klient — serwer
- functional component
- React hooks
- tworzenie list komponentów
- JSX
- pisanie testów

Aplikacja musi korzystać z bazy danych (noSQL lub SQL) i zostać wykonana w architekturze Klient-Serwer (składać się co najmniej z 3 jednostek wdrożeniowych, tzn.: aplikacja webowa, backend i baza danych). 

Back-end zależy zaimplementować za pomocą frameworka Express.js lub NestJS (uczą się go backendowcy w ostatnim rozdziale).

Front-end wykonajcie przy użyciu biblioteki React. 
Jeśli czujecie się na siłach, zastosujcie Redux do zarządzania stanem (frontendowcy poznają go w ostatnim dziale).

Ponieważ projekt jest bardzo duży, będziecie na niego mieli 2 razy więcej czasu, niż poprzednio.
Sugerujemy w czasie działu 5 implementować część back-endową, a wczasie działu 6-tego część front-endową.
Wiedzę uzyskaną w dziale 6-tym możecie wykorzystać w projekcie, ale nie jest to koniecznie.
Ale to Wy odpowiadacie za powodzenie projektu, więc podejmujcie decyzje, korzystajcie z porad bardziej doświadczonych
i zróbcie coś niesamowitego! W trakcie trwania projektu odbędą się dwie prezentacje (z częstotliwością jak dotychczas).
Najprawdodpoboniej na pierwszym spotkaniu zaprezentujecie samo REST API. Warto przygotować je tak, jakby miało być odrębnym produktem!
A na prezentacji kończącej projekt z Reacta, pokażecie jak działa wszystko razem.

##### W trakcie trwania projektu należy wyznaczyć w zespole następujące role
tak jak opisano w przypadku poprzedniego projektu.

##### Sposób oceny projektu (i wszystkich kolejnych projektów na CodersCamp)
tak jak opisano w przypadku poprzedniego projektu.


### Projekt końcowy — aplikacja webowa
Teraz przechodzimy do przykładowego projektu, który został przygotowany przez organizatorów kursu.
Proponowany projekt pozwala na zastosowania większości umiejętności, jakie powinniście posiąśc w trakcie przerabiania działu.
Jednakże jeśli macie pomysł na projekt podobnej skali, który spełni opisane na górze wymagania i czujecie się na siłach
w zdefiniowaniu funkcjonalności, przygotowaniu ekranów i podzieleniu go na zadania — to nic nie stoi na przeszkodzie,
aby wykonać np. coś związanego z zainteresowaniami Waszej grupy :)
**W tym przypadku zachęcamy jeszcze bardziej niż zazwyczaj, aby wykonać coś innego niż proponowany temat.
Ten projekt będzie swoistym zwieńczeniem i podsumowaniem wszystkiego, co nauczyliście się w trakcie trwania CodersCamp.
Przykładowy projekt dajemy Wam głównie po to, abyście odczuli skalę, w której stronę powinniście dążyć przy określaniu własnego pomysłu.**
Możecie też zaimplementować Kino, ale zupełnie inaczej (lepiej) niż tutaj jest zaproponowane. 
Niech wasza prezentacja zwali z nóg uczestników.
Pamiętajcie tylko, że czas jest ograniczony i musicie zdążyć z aplikacją do prezentacji. 
Ten projekt jest niezwykle ważny dla waszej przyszłej programistycznej kariery. Można powiedzieć, że od tego zależy wasze być albo nie być podczas poszukiwania pierwszej pracy. W protoflio Junior Developera znakomicie sprwdzają się tego rodzaju projekty - a okazja do wykonania go w zespole i to pod okiem mentora - już może Wam się więcej nie powtórzyć.
Więc dajcie z siebie wszystko i powodzenia!


### Wymagania
Klient wraz z analitykiem biznesowym spisali podstawowe wymagania co do projektu.
Jednakże nie krępujcie się przed ich doprecyzowaniem / zmianami, czy też ulepszeniami.
To Wy jesteście profesjonalistami w swoim fachu i Klient ufa, że zrobicie wszystko jak najlepiej.
Jeśli uważacie, że jakichś informacji Wam brakuje, najlepiej, jeśli Product Owner spróbuje uzupełnić luki w wymaganiach wraz z klientem.
Wymagania podzielono na dwie sekcje. Aplikację dla widza i panel administracyjny.

##### Wymagania funkcjonalne:
1. Klient może zarejestrować się w systemie, podając imię, nazwisko, hasło i adres e-mail.
1. Klient może zalogować się w systemie, podając adres e-mail i hasło.
1.


##### Prototyp interfejsu użytkownika
Przygotowanie projektu od 0 lub implementacja bez projektu.

##### Wymagania funkcjonalne:


## Możliwe usprawnienia i dodatkowe funkcjonalności:
1. Integracja z zewnętrznym systemem płatności — np. PayU (wykorzystać Sandbox, który umożliwia testowanie płatności bez prawdziwych transakcji)
1. Sprawdzanie biletów — generowanie kodu QR z zakupionym biletem. Bilet jest „sprawdzony” po zeskanowaniu kodu QR telefonem.
1. Kreator do ustawiania miejsc na sali w bardziej skomplikowany sposób niż wspomniany prostokąt.

## Dodatkowe zadania (wykraczające poza zakres kursu):
1. Wykonanie testów E2E, przy użyciu odpowiedniego narzędzia. Proponujemy np. Cypress.
1. Utworzenie Storybook dla zdefiniowanych komponentów.

Wszelkie inne dodane przez Was funkcjonalności czy usprawnienia infrastrukturalne należy przedstawić w README.md projektu :)
