# 🎶 La Grande Soirée Gnawa – Application Mobile & API REST

## 📌 Description du projet

**La Grande Soirée Gnawa** est une application mobile développée pour gérer un événement culturel Gnawa à Agadir.  
L’application permet aux utilisateurs de :

- Consulter les informations de l’événement
- Découvrir les artistes Gnawa participants
- Réserver des billets facilement
- Consulter leurs réservations
- Partager l’événement via deep linking
- Utiliser l’application même en mode hors ligne

Le projet est composé de :
- 📱 **Une application mobile React Native (Expo Router)**
- 🌐 **Une API REST Backend Node.js / Express**
- 🗄 **Une base de données PostgreSQL**

---

## 🧱 Architecture du projet

```
La-Grande-Soiree-Gnawa/
│
├── backend/
│ ├── server.js
│ ├── .env
│ └── src/
│ ├── config/
│ │ └── database.js
│ ├── models/
│ ├── routes/
│ └── controllers/
│
└── mobile/
├── app/
│ ├── index.jsx
│ ├── _layout.jsx
│ ├── artists/
│ └── bookings/
└── src/
├── services/
├── stores/
├── components/
└── constants/
```

---

## ⚙️ Technologies utilisées

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- dotenv
- JWT & bcrypt (pour routes admin)
- CORS

### Frontend
- React Native (Expo Router)
- Zustand (gestion d’état)
- React Query (fetch & cache)
- AsyncStorage (persistance locale)
- React Navigation / Expo Router
- Deep Linking

---

## 🗄 Base de données

Tables PostgreSQL utilisées :

1. **artists** – informations sur les artistes Gnawa
2. **bookings** – réservations des utilisateurs
3. **event_info** – informations générales de l’événement

---

## 📡 Endpoints API

### Routes publiques

- **GET /api/event** – Informations de l’événement
- **GET /api/artists** – Liste des artistes
- **GET /api/artists/:id** – Détails d’un artiste
- **GET /api/bookings/:code** – Réservation par code
- **GET /api/bookings/email/:email** – Réservations par email
- **POST /api/bookings** – Créer une réservation

### Routes admin (protégées par JWT – optionnel)
- **POST /api/auth/login** – Connexion admin
- **POST /api/artists** – Créer un artiste
- **PUT /api/artists/:id** – Modifier un artiste
- **DELETE /api/artists/:id** – Supprimer un artiste

---

## 📱 Écrans de l’application

1. **Home** – Informations de l’événement
2. **Artists List** – Liste des artistes
3. **Artist Detail** – Détails d’un artiste
4. **Booking Form** – Réservation simple
5. **My Bookings** – Mes réservations

---

## 🚀 Installation & démarrage

### Backend
```bash
cd backend
npm install
npm start
```
# Frontend
```bash
cd mobile
npm install
npx expo start
```

# 💡 Notes
- L’application peut fonctionner offline grâce à AsyncStorage et React Query cache.

- L’authentification admin est optionnelle mais sécurisée avec JWT & bcrypt.

- Le projet est modulable et peut facilement être étendu pour ajouter de nouvelles fonctionnalités.

# 📝 Auteur

**Reda El Baqale** – Développeur Full-Stack