# ⏳ TimeBank

A full-stack platform for trading time credits instead of money. Users can **offer services**, **request services**, and **earn/spend credits** in a transparent, auditable system.  

---

## 🚀 Features
- Secure authentication with JWT  
- Create and manage service **offers**  
- Submit and track **requests** for offers  
- **Transactions & balances** automatically updated  
- **Dashboard** for offers, requests, and credit history  
- Review system for feedback and trust-building  

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Vite  
- **Backend:** Node.js, Express, TypeScript  
- **Database:** MySQL with Prisma ORM  
- **Auth:** JWT-based authentication  
- **Dev Tools:** ts-node-dev, nodemon, ESLint, Prettier  

---

## 📂 Project Structure

TimeBank/
├── backend/
│ ├── src/
│ │ ├── index.ts # Server entrypoint
│ │ ├── routes/ # Express routes
│ │ ├── controllers/ # Request handlers
│ │ ├── middleware/ # Auth, error handling
│ │ └── prisma/ # DB client
│ ├── prisma/
│ │ └── schema.prisma # Prisma schema
│ ├── package.json
│ └── tsconfig.json
├── frontend/
│ ├── src/
│ │ ├── api/ # Axios client
│ │ ├── pages/ # Auth, Dashboard
│ │ └── components/ # UI components
│ ├── package.json
│ └── vite.config.ts
└── README.md


---

## 🗄️ Database Schema Overview
- **User**: name, email, password, bio, balance, reviews  
- **Offer**: service details, duration, rate, owner  
- **Request**: linked to an offer, requester, status  
- **Transaction**: logs all credit transfers (from, to, offer, request)  
- **Review**: rating + comments between users  

---

## ⚡ How to Run

### 1. Install & start MySQL
- Create database `timebank` in MySQL:
  ```bash
  mysql -u root -p
  CREATE DATABASE timebank;

### 2. Configure backend

- Inside backend/.env:
 ```bash
  DATABASE_URL="mysql://root:yourpassword@localhost:3306/timebank"
  JWT_SECRET="yoursecretkey"
  PORT=4000
```

### 3. Run backend
``` bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

4. Run frontend

- Inside frontend/.env:
``` bash
VITE_API_URL="http://localhost:4000/api"
```

- Start dev server:
``` bash
cd frontend
npm install
npm run dev
```

### 🔮 Next Steps

📧 Email notifications on booking/accept

📅 Calendar integration for time slots

🔄 Refunds & balance reconciliation

📊 Admin dashboard + CSV export

⭐ Ratings & reviews integration
