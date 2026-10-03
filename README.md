# NexusOS Inventory Management System
### Enterprise-Grade Full-Stack Inventory Intelligence & Asset Control

**Developer:** Sachin R V (MCA Student, REVA University, Bengaluru)  
**Status:** Production Ready  

---

## 🎥 Live Video Walkthrough & Demo
Watch the complete system walkthrough demonstrating backend setup, MongoDB connectivity, live CRUD operations, and real-time metric updates:

🔗 **[Click Here to Watch the Video Walkthrough (Google Drive)](https://drive.google.com/drive/folders/1X-DkrVaikwKllFwEAv7r-fiD24-t75sv?usp=sharing)**

---

## 🌟 Executive Summary
**NexusOS Inventory** is a high-end, professional full-stack inventory management system engineered with modern corporate design aesthetics. It provides enterprise telemetry, real-time stock valuation, dynamic category tracking, and automated low-stock watchlist surveillance to streamline asset management workflows.

---

## 🛠️ Technology Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, Lucide Icons, Custom CSS | Modern SaaS glassmorphic UI and responsive command center |
| **Backend** | Node.js, Express.js | High-performance RESTful API architecture |
| **Database** | MongoDB & Mongoose | Flexible NoSQL schema design for rapid product querying |

---

## 🚀 Key Features & Telemetry
* **Command Center Dashboard:** Real-time financial valuation calculations, total stock unit aggregation, active item telemetry, and threat-level stock alerts.
* **Low Stock Watchlist:** Intelligent automated surveillance that isolates items falling below critical safety thresholds and renders immediate reorder action tables.
* **Category Breakdown Matrix:** Dynamic grouping of inventory items to offer instant category distribution insights.
* **Robust Data Pipelines:** Safe parsing layers ensuring smooth runtime reliability and calculation accuracy.

---

## 📂 Project Architecture
```text
inventory-management-system/
├── backend/
│   ├── models/       # Mongoose product schema definitions
│   ├── routes/       # Express REST API endpoints for CRUD & metrics
│   └── server.js     # Express server entry point (Port 5050)
└── frontend/
    ├── src/
    │   ├── pages/    # Dashboard Command Center & Asset Matrix views
    │   ├── App.jsx   # Layout shell, navigation, and top bar
    │   └── index.css # Global corporate styling and design variables
    └── package.json

```

---

## ⚙️ Step-by-Step Local Setup & Execution

### 1. Clone the Repository

```bash
git clone [https://github.com/sachinrv30/inventory-management-system.git](https://github.com/sachinrv30/inventory-management-system.git)
cd inventory-management-system

```

### 2. Configure & Start MongoDB

Ensure your local MongoDB instance is active:

```bash
mongod

```

### 3. Launch Backend Server

Navigate to the backend directory, install dependencies, and start the API server:

```bash
cd backend
npm install
node server.js

```

*(Server runs live on `http://localhost:5050`)*

### 4. Launch Frontend Client

Open a separate terminal tab, navigate to the frontend directory, install dependencies, and run the Vite development client:

```bash
cd frontend
npm install
npm run dev

```

*(Access the user interface locally at `http://localhost:5173`)*

---

## 💡 Design Assumptions & Engineering Decisions

* **Environment:** Tailored for local development environments with Node.js and MongoDB pre-installed.
* **Visual Philosophy:** Prioritized a crisp, clean corporate light-theme with ambient dot-grid mesh backgrounds over standard dark templates to mimic enterprise software dashboards.
* **Type Safety:** Built-in data casting safeguarding against string/number type mismatches from the database layer.

---

## 🔮 Future Roadmap

* Secure JWT-based user authentication and multi-role access control (Admin vs. Operator).
* Automated PDF and Excel stock audit report generation.
* Integration of predictive AI forecasting models for automated stock reordering.

---

### Developed with 💻 by **Sachin R V**

*MCA Student | REVA University, Bengaluru*
