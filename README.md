# Kha. Mo. Syeed Asif — Full-Stack Portfolio

Welcome to the source code of my dynamic, full-stack personal portfolio! Designed to showcase projects, research publications, achievements, experience, and skills in an interactive, high-performance web experience.

🌐 **Live Demo:** [https://syeed-asif.pages.dev/](https://syeed-asif.pages.dev/)  
⚙️ **Backend API:** [https://portfolio-2-afjx.onrender.com](https://portfolio-2-afjx.onrender.com)

---

## 🌟 Features

- **React 19 & Vite Architecture:** Built with React 19, TypeScript, Tailwind CSS, and Lucide React icons for rapid component rendering and state management.
- **Dynamic Layout & Drag-and-Drop Order:** Reorder portfolio sections on the fly or toggle section visibility directly from the Admin Panel.
- **Live Theme Customizer:** 7 curated theme presets (*Purple, Cyan, Emerald, Rose, Amber, Blue, Midnight*), dark/light mode switcher, glass blur intensity, and border radius customization.
- **Hero Profile Customizer:** Dynamically edit greeting text, typewriter titles, bio, profile photo, social links, and CTA buttons from the Admin Dashboard.
- **About Me & Interactive Stats:** Custom About section with editable paragraphs, cover image, and live metric counter badges.
- **Categorized Skills Catalog:** Showcase skills by domain (*AI/ML, Data Science, Full-Stack, Hardware, Tools*) with animated proficiency bars and level tags.
- **Education & Experience Timeline:** Manage education milestones and professional experience entries dynamically with left/right alternating timeline cards.
- **Embedded Admin Dashboard:** Comprehensive control panel for Projects, Publications, Achievements/Events, Experience, Skills, Messages, CV/Resume, and Backup Settings.
- **HD Lightbox Media Preview:** Interactive full-screen lightbox for previewing project screenshots and achievement certificates.
- **Keep-Alive Uptime Robot Monitoring:** Built-in `/health`, `/api/health`, and `/ping` endpoints to prevent free hosting from sleeping.
- **Transactional Email Routing:** Contact form submissions automatically notify your inbox via Resend API (with Nodemailer SMTP fallback).

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Motion, Lucide React, Canvas Confetti
- **Backend:** Node.js, Express.js, Nodemailer, Resend SDK, Render
- **Database:** MongoDB Atlas
- **Monitoring:** UptimeRobot (pings `/health` every 5m)

---

## 📡 Health Check & Keep-Alive Endpoints

To prevent backend sleeping on free hosting platforms (such as Render), the server exposes lightweight health endpoints:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/health` | `GET` | Main UptimeRobot monitoring endpoint |
| `/api/health` | `GET` | Alternative API health check endpoint |
| `/ping` | `GET` | Lightweight keep-alive check |

**UptimeRobot Setup:**
- **Type:** `HTTP(s)`
- **URL:** `https://portfolio-2-afjx.onrender.com/health`
- **Interval:** `Every 5 minutes`

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

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

5. **Run Backend Server:**
   ```bash
   npm start
   ```

---

## 📂 Project Structure

- `src/components/portfolio/`: React components for Hero, About, Skills, Projects, Publications, Events, Experience, Contact, and Footer.
- `src/components/admin/`: Admin components for Content Manager, Hero Editor, Layout Customizer, Theme Customizer, Resume Manager, Messages Inbox, and Backup.
- `src/context/PortfolioContext.tsx`: Central state management, LocalStorage persistence, and API synchronization.
- `server.js`: Express.js backend handling MongoDB connection, health monitoring, cache middleware, and email routing.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Syeed7682/Portfolio/issues).

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Built with ❤️ by [Kha. Mo. Syeed Asif](https://github.com/Syeed7682)*
