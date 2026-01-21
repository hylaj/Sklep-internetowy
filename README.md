# Sklep Internetowy (React)

Projekt zaliczeniowy realizujący funkcjonalność sklepu internetowego (SPA) z wykorzystaniem zewnętrznego API FakeStore. Aplikacja umożliwia przeglądanie produktów, zarządzanie koszykiem, składanie zamówień oraz dodawanie opinii.

## Autorzy
1. **Jolanta Hyla**
2. **Gabriela Orłowska**

---

## Uruchomienie Projektu

### Wymagania wstępne
* Zainstalowane środowisko **Node.js**.

### Instrukcja instalacji

1. Otwórz terminal w głównym folderze projektu.
2. Zainstaluj zależności:
   ```bash
   npm install

3. Uruchom serwer deweloperski:
   ```bash
   npm run dev

4. Otwórz przeglądarkę pod adresem wskazanym w terminalu (zazwyczaj `http://localhost:5173`).

---

## Użyte Technologie i Biblioteki

Aplikacja została zbudowana w oparciu o nowoczesny stos technologiczny React (Vite):

* **Core:** React 19, Vite
* **Routing:** React Router DOM (v7) – nawigacja bez przeładowania strony.
* **UI & Stylizacja:**
* React Bootstrap – responsywne komponenty (Grid, Cards, Forms).
* Bootstrap Icons – ikony systemowe.
* CSS Modules / Custom CSS – nowoczesny wygląd (Glassmorphism, cienie).


* **Stan i Logika:** Context API (`ShopContext`, `AuthContext`) – zarządzanie koszykiem i sesją użytkownika.
* **Dodatki:**
* `react-hot-toast` – estetyczne powiadomienia (Toasty).
* `localStorage` – trwałość danych (sesja, koszyk, historia, opinie).



---

## Dane Logowania (Mock)

Aplikacja posiada zamockowany system autentykacji. Do testowania uprawnień należy użyć poniższych kont:

| Rola | Login | Hasło | Uprawnienia |
| --- | --- | --- | --- |
| **Student** | `student1` | `123` | Składanie zamówień, dodawanie opinii, historia własna. |
| **Admin** | `admin` | `admin` | Podgląd historii wszystkich użytkowników (rola Nauczyciel). |

---

## Opis Funkcjonalności

Projekt realizuje wymagania na ocenę (18 pkt), w tym:

### 1. Część Ogólnodostępna

* **Strona Główna:** Pobieranie produktów z `fakestoreapi.com`.
* **Wyszukiwanie i Filtrowanie:** Wyszukiwarka po nazwie oraz filtrowanie po kategoriach produktów.
* **Szczegóły Produktu:** Widok detali, galeria, cena, opis oraz sekcja "Trust Signals" (dostawa, gwarancja).
* **Opinie:** Przeglądanie opinii dodanych przez użytkowników.

### 2. Koszyk i Zakupy

* **Zarządzanie Koszykiem:** Dodawanie produktów, zmiana ilości, usuwanie pozycji.
* **Kalkulacja:** Automatyczne przeliczanie sumy całkowitej.
* **Security Guard:** Próba wejścia do koszyka/zamówienia bez logowania automatycznie przekierowuje do panelu logowania.

### 3. Funkcje dla Zalogowanych

* **Trwała Sesja:** Użytkownik pozostaje zalogowany po odświeżeniu strony (`localStorage`).
* **Składanie Zamówień:** Symulacja procesu checkout – zamówienie trafia do historii, koszyk jest czyszczony.
* **Historia Zamówień:**
* Zwykły użytkownik widzi tylko swoje zamówienia.
* Admin widzi zamówienia wszystkich użytkowników.


* **Opinie:**
* Formularz z oceną gwiazdkową (1-5).
* Walidacja (wymagany email i treść).
* **Limit:** Blokada dodawania więcej niż jednej opinii dla tego samego produktu przez jednego użytkownika.
* **Trwałość:** Opinie są zapisywane w pamięci przeglądarki.
* **Usuwanie:**
   * Użytkownik może usunąć tylko swoją opinię.
   * Admin (Teacher) ma uprawnienie do usuwania dowolnej opinii.

---

## Struktura Projektu

```text
src/
├── components/
├── context/
├── pages/
├── App.jsx
└── main.jsx

```


