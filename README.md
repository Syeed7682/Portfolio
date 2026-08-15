# Kha. Mo. Syeed Asif — Full-Stack Portfolio 🚀

Welcome to the source code of my dynamic, full-stack personal portfolio! Designed to showcase projects, research publications, achievements, experience, and skills in an interactive, high-performance web experience.

🌐 **Live Demo:** [[https://syeed-asif.pages.dev/](https://portfolio.syeed-asif.workers.dev/)
⚙️ **Backend API:** [https://portfolio-2-afjx.onrender.com](https://portfolio-2-afjx.onrender.com)

---

## 🌟 Features

- **React 19 & Vite Architecture:** Built with React 19, TypeScript, Tailwind CSS, and Lucide React icons for rapid component rendering and state management.
- **Dynamic Layout & Drag-and-Drop Order:** Reorder portfolio sections on the fly or toggle section visibility directly from the Admin Panel.
- **Live Theme Customizer:** 7 curated theme presets (*Purple, Cyan, Emerald, Rose, Amber, Blue, Midnight*), dark/light mode switcher, glass blur intensity, and border radius customization.
- **Hero Profile Customizer:** Dynamically edit greeting text, typewriter titles, bio, profile photo, social links, and CTA buttons from the Admin Dashboard.
- **Image File Uploads:** Upload image files directly from the Admin Panel for your Hero profile photo and About cover photo, generating instant live previews.
- **Categorized Skills Catalog:** Showcase skills by domain (*AI/ML, Data Science, Full-Stack, Hardware, Tools*) with animated proficiency bars and level tags.
- **Embedded Admin Dashboard:** Comprehensive control panel for Projects, Publications, Achievements/Events, Experience, Skills, Messages, CV/Resume, and Backup Settings.
- **Real-time MongoDB Sync:** All projects, publications, and events are synchronized dynamically with a MongoDB Atlas backend.
- **HD Lightbox Media Preview:** Interactive full-screen lightbox for previewing project screenshots and achievement certificates.
- **Transactional Email Routing:** Contact form submissions automatically notify your inbox via Resend API (with Nodemailer SMTP fallback).
- **SPA Fallback Routing:** Fully configured Express backend to serve the compiled Vite Single Page Application smoothly on any cloud host.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Motion, Lucide React, Canvas Confetti
- **Backend:** Node.js, Express.js, Nodemailer, Resend SDK
- **Database:** MongoDB Atlas
- **Monitoring:** UptimeRobot (pings `/health` every 5m)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- A free [Resend](https://resend.com) account (for email forwarding)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Syeed7682/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   RESEND_API_KEY=your_resend_api_key
   GMAIL_USER=your_email@gmail.com
   GMAIL_PASS=your_gmail_app_password
   ```

4. **Seed Database (Initial Setup):**
   Run the custom seeding script to populate your live MongoDB cluster with your local placeholder data and image paths.
   ```bash
   npm run seed
   ```

5. **Run Development Server (Frontend + Backend mockup):**
   ```bash
   npm run dev
   ```

### ☁️ Production Deployment (Render)

1. Connect your GitHub repository to [Render](https://render.com).
2. Use the following **Build Command**:
   ```bash
   npm install && npm run build
   ```
3. Use the following **Start Command**:
   ```bash
   npm start
   ```
4. Copy your local `.env` values into the Render Environment Variables tab.
5. Render will now start the Express server which serves the built React app (`dist/`) and powers the API concurrently.

---

## 📂 Project Structure

- `src/components/portfolio/`: React components for Hero, About, Skills, Projects, Publications, Events, Experience, Contact, and Footer.
- `src/components/admin/`: Admin components for Content Manager, Hero Editor, Layout Customizer, Theme Customizer, Resume Manager, Messages Inbox, and Backup.
- `src/data/initialData.ts`: Centralized fallback and default dataset (used for UI state and database seeding).
- `src/context/PortfolioContext.tsx`: Central state management, LocalStorage persistence, and MongoDB API synchronization.
- `server.js`: Express.js backend handling MongoDB connection, health monitoring, cache middleware, SPA routing, and email forwarding.
- `seedMongo.ts`: Script for clearing and securely populating the MongoDB database with `initialData.ts`.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Syeed7682/Portfolio/issues).

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Built with ❤️ by [Kha. Mo. Syeed Asif](https://github.com/Syeed7682)*
