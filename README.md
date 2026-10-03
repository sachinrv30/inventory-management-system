# ⚡ NexusOS Inventory Management System

<p align="center">
  <strong>Enterprise-Grade Inventory Intelligence & Asset Control Platform</strong>
</p>

<p align="center">
  A modern full-stack inventory management system built with React, Node.js, Express.js and MongoDB — designed to transform traditional inventory operations into a real-time digital command center.
</p>

<p align="center">

![Status](https://img.shields.io/badge/Status-Production--Ready-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Fast-BD34FE?style=for-the-badge&logo=vite&logoColor=white)

</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-api">API</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 🛰️ Product Overview

**NexusOS Inventory** is an enterprise-inspired inventory intelligence platform that provides a centralized command center for monitoring products, stock levels, financial valuation and inventory health.

Instead of presenting inventory as a simple CRUD application, NexusOS focuses on **real-time operational visibility** through a modern dashboard experience.

### Core Intelligence

```text
                    NEXUSOS INVENTORY
                           │
          ┌────────────────┼────────────────┐
          │                │                │
       INVENTORY        ANALYTICS        ALERTS
          │                │                │
     Product CRUD      Stock Value     Low Stock
     Asset Tracking    Categories      Watchlist
     Quantity Control  Telemetry       Reorder Signals
          │                │                │
          └────────────────┼────────────────┘
                           │
                       MONGODB
                           │
                    EXPRESS REST API
                           │
                    REACT COMMAND UI
```

---

# 🎥 Live Demonstration

## Complete System Walkthrough

The video demonstrates:

- Backend configuration
- MongoDB connectivity
- Product creation
- Product updates
- Product deletion
- Real-time dashboard metrics
- Inventory valuation
- Category analytics
- Low-stock monitoring
- Frontend ↔ Backend communication

### ▶️ Watch the Full Demo

**[🎬 Open NexusOS Video Walkthrough](https://drive.google.com/drive/folders/1X-DkrVaikwKllFwEAv7r-fiD24-t75sv?usp=sharing)**

---

# ✨ Why NexusOS?

Traditional inventory applications often focus only on:

> Add Product → Edit Product → Delete Product

NexusOS expands this concept into an **inventory intelligence dashboard**.

| Traditional Inventory | NexusOS |
|---|---|
| Basic CRUD | Operational Command Center |
| Static tables | Live telemetry |
| Manual stock checking | Low-stock surveillance |
| Basic product lists | Category intelligence |
| Simple quantity display | Stock valuation |
| Minimal visualization | Dashboard analytics |
| Generic interface | Enterprise SaaS-inspired UI |

---

# 🧠 Core Features

## 🎯 01 — Command Center Dashboard

A centralized operational dashboard providing an instant overview of the inventory ecosystem.

### Dashboard Intelligence

- Total inventory items
- Total stock units
- Total inventory valuation
- Active inventory telemetry
- Low-stock count
- Category distribution
- Inventory health indicators

---

## 📦 02 — Complete Inventory CRUD

Manage the entire product lifecycle through a clean interface.

### Supported Operations

```text
CREATE
   ↓
Product Registration
   ↓
READ
   ↓
Inventory Monitoring
   ↓
UPDATE
   ↓
Stock / Product Modification
   ↓
DELETE
   ↓
Asset Removal
```

---

## 🚨 03 — Low Stock Intelligence

NexusOS automatically identifies products approaching their configured stock threshold.

### Example

```text
┌─────────────────────────────────────────────┐
│              LOW STOCK WATCHLIST            │
├─────────────────────────────────────────────┤
│ Product          Stock       Threshold      │
│─────────────────────────────────────────────│
│ Wireless Mouse     4             10         │
│ USB-C Hub          6             15         │
│ Keyboard           3              8         │
└─────────────────────────────────────────────┘
```

This creates a focused operational view for inventory replenishment.

---

## 💰 04 — Real-Time Stock Valuation

NexusOS calculates inventory value dynamically based on:

```text
Inventory Value
      =
Product Price × Available Quantity
```

This allows administrators to understand the financial value represented by current stock.

---

## 🗂️ 05 — Category Intelligence

Inventory is dynamically grouped into categories to provide a clearer understanding of product distribution.

Example:

```text
Electronics      ██████████████████
Accessories      ████████████
Peripherals      █████████
Hardware         █████
Other            ███
```

---

## 🔄 06 — Real-Time Data Synchronization

The frontend communicates with the Express REST API and MongoDB backend to ensure inventory operations are reflected throughout the dashboard.

```text
React UI
   │
   │ HTTP Request
   ▼
Express API
   │
   │ Mongoose
   ▼
MongoDB
   │
   │ Response
   ▼
React Dashboard
   │
   ▼
Updated Telemetry
```

---

# 🖥️ Interface

NexusOS follows a modern **enterprise SaaS command-center design philosophy**.

### Design Principles

- Clean corporate layout
- Responsive interface
- Glass-inspired UI elements
- Structured information hierarchy
- Ambient background effects
- Data-focused cards
- Clear status indicators
- Minimal visual clutter
- Professional typography
- Consistent spacing system

---

# 🧩 Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | Component-based UI |
| Vite | Development & build tooling |
| Lucide Icons | Modern interface icons |
| CSS | Custom enterprise UI system |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| Mongoose | MongoDB object modeling |

## Database

| Technology | Purpose |
|---|---|
| MongoDB | Inventory data storage |
| MongoDB Compass | Optional database visualization |

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │      USER           │
                         │   Web Browser       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   REACT FRONTEND    │
                         │                     │
                         │ Dashboard           │
                         │ Inventory            │
                         │ Analytics            │
                         │ Watchlist            │
                         └──────────┬──────────┘
                                    │
                              REST API
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   EXPRESS SERVER    │
                         │                     │
                         │ CRUD Routes         │
                         │ Validation           │
                         │ Business Logic       │
                         └──────────┬──────────┘
                                    │
                              Mongoose ODM
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      MONGODB        │
                         │                     │
                         │ Products            │
                         │ Inventory Data      │
                         │ Stock Information   │
                         └─────────────────────┘
```

---

# 📁 Project Structure

```text
inventory-management-system/
│
├── backend/
│   │
│   ├── models/
│   │   └── Product.js
│   │
│   ├── routes/
│   │   └── productRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Inventory.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│
└── README.md
```

---

# ⚙️ Installation

## Prerequisites

Make sure the following are installed:

```text
Node.js 18+
MongoDB
Git
npm
```

Verify installation:

```bash
node --version
npm --version
mongod --version
git --version
```

---

# 🚀 Run NexusOS Locally

## 1️⃣ Clone Repository

```bash
git clone https://github.com/sachinrv30/inventory-management-system.git
```

Navigate into the project:

```bash
cd inventory-management-system
```

---

## 2️⃣ Start MongoDB

Make sure MongoDB is running locally.

```bash
mongod
```

If MongoDB is installed through Homebrew on macOS:

```bash
brew services start mongodb-community
```

---

# 🔧 Backend Setup

Open a terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
node server.js
```

Backend API:

```text
http://localhost:5050
```

Expected output:

```text
Server running on port 5050
MongoDB connected successfully
```

---

# 🎨 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 🔐 Environment Configuration

Create a `.env` file inside the backend directory.

```env
PORT=5050
MONGO_URI=mongodb://127.0.0.1:27017/inventoryDB
```

> Never commit production credentials, API keys or secrets to GitHub.

---

# 🔌 REST API

NexusOS uses RESTful endpoints for inventory operations.

## Product Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products` | Fetch products |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Example Request

```http
GET http://localhost:5050/api/products
```

### Example Product

```json
{
  "name": "Wireless Keyboard",
  "category": "Peripherals",
  "price": 1499,
  "quantity": 25,
  "threshold": 10
}
```

---

# 📊 Inventory Intelligence

NexusOS derives operational metrics from the inventory dataset.

### Total Stock

```text
Σ Product Quantity
```

### Inventory Valuation

```text
Σ (Product Price × Product Quantity)
```

### Low Stock Detection

```text
Quantity ≤ Threshold
```

### Category Distribution

```text
Products → Group By Category → Calculate Distribution
```

These calculations provide the dashboard with continuously updated inventory intelligence.

---

# 🛡️ Engineering Considerations

### Data Validation

Product data is validated before database operations.

### Type Safety

The application handles numeric values carefully to prevent incorrect calculations caused by string/number mismatches.

### API Separation

Frontend and backend are separated into independent application layers.

### Modular Architecture

Backend models and routes are organized to support future scalability.

### Responsive UI

The frontend is designed to remain usable across different screen sizes.

---

# 📸 Screenshots

> Add your project screenshots inside the `screenshots/` folder and update the filenames below.

### Dashboard

![NexusOS Dashboard](./screenshots/dashboard.png)

### Inventory Management

![Inventory Management](./screenshots/inventory.png)

### Low Stock Watchlist

![Low Stock Watchlist](./screenshots/low-stock.png)

### Analytics

![Inventory Analytics](./screenshots/analytics.png)

---

# 🔄 Application Workflow

```text
                  USER
                   │
                   ▼
             React Dashboard
                   │
                   ▼
              REST Request
                   │
                   ▼
             Express Server
                   │
                   ▼
               Mongoose
                   │
                   ▼
                MongoDB
                   │
                   ▼
             Query Results
                   │
                   ▼
            Business Metrics
                   │
                   ▼
             React Dashboard
                   │
                   ▼
          Updated Inventory View
```

---

# 🎯 Current Capabilities

```text
✓ Inventory CRUD
✓ Product management
✓ MongoDB integration
✓ REST API
✓ Real-time dashboard calculations
✓ Inventory valuation
✓ Stock aggregation
✓ Category analytics
✓ Low-stock detection
✓ Responsive UI
✓ Modern enterprise design
✓ Frontend / Backend separation
```

---

# 🧭 Future Roadmap

NexusOS is designed with future enterprise capabilities in mind.

### Phase 01 — Security

- [ ] JWT authentication
- [ ] Role-based access control
- [ ] Admin accounts
- [ ] Operator accounts
- [ ] Protected API routes

### Phase 02 — Reporting

- [ ] PDF inventory reports
- [ ] Excel export
- [ ] Automated stock reports
- [ ] Audit history
- [ ] Inventory activity logs

### Phase 03 — Intelligence

- [ ] AI demand forecasting
- [ ] Predictive stock depletion
- [ ] Automated reorder recommendations
- [ ] Intelligent anomaly detection
- [ ] Inventory trend analysis

### Phase 04 — Enterprise

- [ ] Cloud deployment
- [ ] Multi-warehouse management
- [ ] Supplier management
- [ ] Purchase orders
- [ ] Barcode / QR integration
- [ ] Advanced analytics

---

# 💡 Engineering Vision

NexusOS was designed around one principle:

> **Inventory management should provide intelligence, not just information.**

The platform combines:

```text
DATA
 +
AUTOMATION
 +
VISUALIZATION
 +
OPERATIONAL INSIGHT
 =
INVENTORY INTELLIGENCE
```

---

# 👨‍💻 Developer

<p align="center">

### Sachin R V

**MCA Student | REVA University, Bengaluru**

Full-Stack Developer • AI/ML Enthusiast • Software Engineering

</p>

<p align="center">

<a href="https://github.com/sachinrv30">
<img src="https://img.shields.io/badge/GitHub-sachinrv30-181717?style=for-the-badge&logo=github">
</a>

</p>

---

# ⭐ Support the Project

If you find **NexusOS Inventory Management System** useful or interesting:

⭐ Star the repository  
🍴 Fork the project  
💡 Explore the code  
🐛 Report issues  
🚀 Suggest improvements  

---

# 📜 License

This project is developed for educational, portfolio and demonstration purposes.

---

<p align="center">

<strong>⚡ NexusOS Inventory</strong>

<br>

<sub>Enterprise Inventory Intelligence • Built with React + Node.js + MongoDB</sub>

<br><br>

<strong>Designed & Developed by Sachin R V</strong>

</p>
