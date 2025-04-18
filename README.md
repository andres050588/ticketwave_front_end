# TicketWave – Frontend

**TicketWave** è una piattaforma moderna per la **rivendita sicura di biglietti per concerti, eventi sportivi e spettacoli**, creata per facilitare l'incontro tra chi vende e chi acquista biglietti non più utilizzabili.

Questa repository contiene il **frontend React** del progetto, progettato con un'interfaccia responsive, moderna e user-friendly.

---

## Tecnologie principali

-   **React 18**
-   **React Bootstrap** – layout responsive e componenti UI
-   **Axios** – gestione richieste HTTP verso il backend
-   **Formik + Yup** – validazione dei form di login/registrazione
-   **React Router DOM** – routing client-side
-   **CSS personalizzato** – animazioni, effetti visivi e stile custom

---

## Struttura delle cartelle

```
ticketwave_frontend/
│
├── public/
│   └── images/               # Immagini pubbliche (concert.jpg, ecc.)
│
├── src/
│   ├── components/           # Componenti riutilizzabili (HeroSection, ecc.)
│   ├── pages/                # Pagine principali (HomePage, LoginPage, ecc.)
│   ├── App.js                # Routing principale
│   ├── index.js              # Entry point React
│   └── index.css             # Stili globali
```

---

## 🔧 Funzionalità implementate

-   Hero Section con sfondo dinamico e CTA
-   Sezione “Come funziona”
-   Elenco biglietti in primo piano (mock)
-   Design responsivo e coerente
-   Integrazione GitHub + SSH
-   Setup per supporto login/register (in corso)

---

## 🔗 Collegamento al backend

Questo frontend comunica con il backend Node.js/Express (in altro repo) tramite le seguenti API:

-   `POST /api/register` → Registrazione nuovo utente
-   `POST /api/login` → Login utente con JWT
-   `GET /api/tickets` → Recupero biglietti disponibili
-   `POST /api/purchase` → Avvio acquisto biglietto

---

## 📌 Autore

**AndreiB (andres050588)**  
Frontend Developer – App Monolitica → Microservizi

---

## Licenza

Questo progetto è distribuito con licenza **MIT**.  
Sentiti libero di copiarlo, modificarlo e condividerlo.
