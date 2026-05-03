<div align="center">

# 🧊 SmartFridge

### Manage your fridge and generate AI-powered recipes

[![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[Live Demo](https://smart-fridge-lac.vercel.app/dashboard) · [Report Bug](https://github.com/diegocorteL33T/SmartFridge/issues) · [Request Feature](https://github.com/diegocorteL33T/SmartFridge/issues)

</div>

---

## 📋 About the Project

**SmartFridge** is a full-stack web application that turns fridge management into a smart experience. Add your food items, track expiration dates and stock levels, and let AI generate personalized recipes using the ingredients you already have at home.

### ✨ Features

- **📦 Inventory Management** — Add, edit, and remove food items with name, quantity, category, and expiration date
- **⚠️ Expiration Alerts** — Visual indicators for expired, expiring soon (3 days), and low stock items
- **🤖 AI Recipe Generation** — Automatic recipe creation via Google Gemini based on your current ingredients
- **🌍 Multilingual** — Full interface support for English and Brazilian Portuguese
- **🌙 Dark / Light Theme** — Theme toggle with localStorage persistence
- **📊 Dashboard** — Overview panel with key metrics: total items, expiring soon, categories, and low stock

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Angular | 18 | Main framework |
| Angular Material | 18 | UI components |
| ngx-translate | 17 | Internationalization (i18n) |
| TypeScript | 5.5 | Language |
| RxJS | 7.8 | Reactive programming |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Spring Boot | 3.5 | Main framework |
| Spring WebFlux | — | Reactive HTTP calls to Gemini |
| Spring Data JPA | — | Data persistence |
| Flyway | — | Database migrations |
| H2 Database | — | Embedded database |
| Lombok | — | Boilerplate reduction |
| Google Gemini AI | 2.5 Flash Lite | Recipe generation |

---

## 🚀 Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Java](https://www.java.com/) 17+
- [Maven](https://maven.apache.org/) 3.8+
- [Google Gemini](https://aistudio.google.com/app/apikey) API key

### 1. Clone the repository

```bash
git clone https://github.com/diegocorteL33T/SmartFridge.git
cd SmartFridge
```

### 2. Set up the Backend

```bash
cd backend
```

Set the environment variable with your Gemini API key:

```bash
# Linux / macOS
export GEMINI_API_KEY=your_key_here

# Windows (PowerShell)
$env:GEMINI_API_KEY="your_key_here"
```

Start the server:

```bash
./mvnw spring-boot:run
```

The backend will be available at `http://localhost:8080`.

### 3. Set up the Frontend

```bash
cd frontend
npm install
npm start
```

The application will be available at `http://localhost:4200`.

> The development proxy automatically forwards `/food` and `/recipe` calls to the backend at `localhost:8080`.

---

## 📡 API Endpoints

### Food Items (`/food`)

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/food/all` | List all food items |
| `GET` | `/food/{id}` | Get a food item by ID |
| `POST` | `/food/add` | Create a new food item |
| `PATCH` | `/food/update/{id}` | Partially update a food item |
| `DELETE` | `/food/delete/{id}` | Delete a food item |

### Recipes (`/recipe`)

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/recipe/generate?lang=en` | Generate a recipe from current fridge items |

**`lang` parameter:** `pt` for Portuguese, `en` for English.

---

## 📂 Project Structure

```
SmartFridge/
├── backend/
│   └── src/main/java/dev/java10x/SmartFridge/
│       ├── config/          # CORS and WebClient config
│       ├── controller/      # FoodItemController, RecipeController
│       ├── exception/       # ResourceNotFoundException
│       ├── model/           # FoodItem entity, DTOs
│       ├── repository/      # FoodItemRepository (JPA)
│       └── service/         # FoodItemService, GeminiService
│
└── frontend/
    └── src/app/
        ├── core/
        │   ├── models/      # FoodItem interface + categories
        │   └── services/    # food-item, recipe, theme services
        ├── features/
        │   ├── dashboard/        # Main inventory view
        │   ├── food-item-card/   # Individual item card
        │   ├── food-item-form/   # Add/edit modal form
        │   └── recipe/           # AI recipe generator
        └── assets/i18n/     # en.json, pt.json
```

---

## 🗂️ Food Categories

The system supports 11 categories, each with a distinct icon and color:

| Category | Icon | Color |
|----------|------|-------|
| Dairy | 🥛 | Blue |
| Meat | 🥩 | Red |
| Seafood | 🐟 | Cyan |
| Vegetables | 🥦 | Green |
| Fruits | 🍎 | Pink |
| Grains | 🌾 | Amber |
| Beverages | 🥤 | Purple |
| Condiments | 🧂 | Orange |
| Snacks | 🍿 | Yellow |
| Frozen Foods | ❄️ | Light Blue |
| Other | 📦 | Gray |

---

## 🌍 Internationalization

The app is available in two languages with dynamic switching in the navbar:

- 🇺🇸 **English**
- 🇧🇷 **Portuguese (Brazil)**

Translation files are located at `frontend/src/assets/i18n/`. The selected language is also sent to the backend so that Gemini responds with recipes in the correct language.

---

## ☁️ Deploy

The project is configured for deployment on [Railway](https://railway.app/):

- **Backend:** `https://smartfridge-production-a852.up.railway.app`
- **Required variable:** `GEMINI_API_KEY`

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/diegocorteL33T">Diego Corte</a>
</div>
