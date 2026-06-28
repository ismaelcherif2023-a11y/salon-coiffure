# ✦ Royal Cut — Salon de Coiffure en Ligne

Site web complet pour un salon de coiffure afro-urbain situé à **Château Rouge, Paris 18ème**.

## Fonctionnalités

- Catalogue des coiffures avec photos et prix
- Réservation de rendez-vous en ligne (nom, prénom, téléphone, date/heure)
- Notification email automatique au propriétaire à chaque nouveau RDV
- Dashboard admin pour gérer les rendez-vous (confirmer, annuler, supprimer)
- Ajout de coiffures avec upload de photos depuis le dashboard
- Contact direct (téléphone, email, SMS, WhatsApp)

## Stack technique

- **Frontend** : React (Vite) + React Router
- **Backend** : Node.js + Express
- **Base de données** : PostgreSQL + Prisma ORM
- **Email** : Nodemailer + Brevo SMTP
- **Upload photos** : Multer
- **Auth admin** : JWT + bcryptjs

## Installation

### Prérequis
- Node.js v18+
- Docker (pour PostgreSQL)
- Compte Brevo (pour les emails)

### 1. Cloner le projet
```bash
git clone https://github.com/ismaelcherif2023-a11y/salon-coiffure.git
cd salon-coiffure
```

### 2. Lancer PostgreSQL avec Docker
```bash
docker run --name salon-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin123 -e POSTGRES_DB=salon_db -p 5432:5432 -d postgres:16
```

### 3. Configurer le backend
```bash
cd server
npm install
```

Crée un fichier `.env` :
```env
DATABASE_URL="postgresql://admin:admin123@localhost:5432/salon_db"
JWT_SECRET="ton_secret_jwt"
STRIPE_SECRET_KEY="sk_test_..."
PORT=5000
BREVO_SMTP_USER=ton_user_brevo
BREVO_SMTP_KEY=ta_cle_brevo
PROPRIETAIRE_EMAIL=ton@email.com
```

```bash
npx prisma migrate dev --name init
npm run dev
```

### 4. Configurer le frontend
```bash
cd ../client
npm install
npm run dev
```

## Accès

| Page | URL |
|------|-----|
| Site client | http://localhost:5173 |
| Dashboard admin | http://localhost:5173/admin |
| API backend | http://localhost:5000 |

## Créer le compte admin

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@salon.com","password":"admin123"}'

## Lancer en local (Windows)

Ouvre **2 CMD** séparés :

**CMD 1 — Backend :**
```bash
cd C:\Users\User\salon-coiffure\server
npm run dev
```

**CMD 2 — Frontend :**
```bash
cd C:\Users\User\salon-coiffure\client
npm run dev
```

Ensuite ouvre le navigateur sur :
- Site client : http://localhost:5173
- Dashboard admin : http://localhost:5173/admin
- API backend : http://localhost:5000
  
```

## Developpeur

**Ismael Cherif** — Développeur Full Stack — Master Expert en Informatique et Systèmes d'Information — EPSI Paris

