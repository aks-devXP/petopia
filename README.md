# 🐾 Petopia – Comprehensive Platform for Modern Pet Ownership

**Petopia** is a full-stack web platform aimed at modernizing pet adoption, donation, and care services across India. Built for shelters, pet adopters, donors, and service providers, Petopia streamlines the fragmented ecosystem into a transparent and accessible digital interface.

🌐 **Live App**: [https://petopia-inky.vercel.app](https://petopia-inky.vercel.app)  
🔗 **Backend API**: [https://petopia-2l32.onrender.com](https://petopia-2l32.onrender.com)
🎥 **Demo Video**: [Introduction & Demo](https://drive.google.com/file/d/1yaznCHAHQp2iAel1taItd_5C3n5if0Kx/view)

---

## 💡 Why Petopia?

The Indian pet adoption ecosystem is often fragmented, offline, and inaccessible. Petopia bridges this gap by offering a unified platform for shelters, adopters, and service providers—reducing adoption time, increasing transparency, and boosting pet welfare nationwide.

---

## 🚀 Features


- 🐶 **Pet Discovery & Adoption:** Browse animals from local shelters with search and filters.
- 📅 **Appointment Booking:** Schedule services like vet checkups and grooming.
- 🏠 **Shelter Dashboard** – Manage pet inventory and view booking requests
- 💸 **Donations & Sponsorships** – Allow donors to fund specific animals or shelters
- 🧑‍💼 **Role-Based Dashboards:** Admins, shelters, and users get personalized experiences.
- 🌍 **Location-Based Filtering** – Match services by city/region
- 🔐 **Secure Auth:** JWT-based authentication with Google reCAPTCHA integration.
- ⚡ **Real-Time API Services:** Seamless communication between frontend and backend.
- 📊 **Analytics & Admin Tools:** Track bookings, monitor adoptions, and manage listings.

---

## 🛠️ Tech Stack

| Layer       | Technologies                                       |
|-------------|----------------------------------------------------|
| Frontend    | React.js, Tailwind CSS, Vite                       |
| Backend     | Node.js, Express.js, MongoDB                       |
| Auth        | JWT (JSON Web Tokens)                              |
| Hosting     | Vercel (frontend), Render (backend)                |
| Versioning  | Git, GitHub                                        |
| Project Tools | Postman, Canva, Figma                   |

---

## 📁 Repository Structure

```bash
Petopia/
├── Backend/
│ ├── Controllers/
│ ├── Middlewares/
│ ├── Models/
│ ├── Routes/
├── Frontend/
│ ├── public/
│ ├── src/
└── README.md
└── Petopia-Report.pdf
└── Petopia-Presentation.pdf
```

---

## 🛠️ Local Development Setup

Follow the steps below to run the Petopia project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/aks-devXP/petopia.git
cd petopia
```

### 2. Environment Variables
Make sure to receive and configure necessary environment variables from the dev team.

### 3. Backend Setup
Open a new terminal:

```bash
cd Backend
npm install          # Install dependencies
npm run dev       # Start the backend server (default: http://localhost:3000)
```

### 4. Frontend Setup
Open a new terminal:

```bash
cd Frontend
npm install          # Install dependencies
npm run dev          # Start the frontend dev server (default: http://localhost:5173)
```

You should now have both frontend and backend running locally. Navigate to http://localhost:5173 to use the app.

---

## 🧪 Testing & CI/CD

- Manual functional testing using Postman
- Frontend deployed via **Vercel CI**
- Backend auto-deployed on push using **Render deploy hooks**

---

## 📄 Documentation

For a detailed overview of Petopia’s architecture, features, and development process, refer to the following documents:

- [🔗 Project Report - ENT (PDF)](./BTP_Report_Petopia.pdf)
- [🔗 Project Presentation (PDF)](./BTP-Petopia-Presentation.pdf)

These documents cover:
- Project background and motivation
- System architecture and tech stack
- UI/UX walkthrough and wireframes
- API specifications
- Deployment details
- Evaluation and future scope




