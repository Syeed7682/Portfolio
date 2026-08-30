# Dynamic Personal Portfolio

Welcome to the source code of my dynamic, full-stack personal portfolio! This website is designed to showcase my projects, research publications, events, and achievements in an interactive, high-performance manner.

🌐 **Live Demo:** [https://syeed-asif.pages.dev/](https://syeed-asif.pages.dev/)  
⚙️ **Backend API:** [https://portfolio-2-afjx.onrender.com](https://portfolio-2-afjx.onrender.com)

---

## 🌟 Features

- **Modern & Responsive UI:** Built with HTML5, vanilla JavaScript, and Tailwind CSS. Features a sleek dark theme with glassmorphism effects and smooth micro-animations.
- **Ultra-Fast Database Caching:** Portfolio data is combined and served using an in-memory caching system, reducing database query overhead and making page loads virtually instant.
- **Keep-Alive Uptime Monitoring:** Built-in `/health`, `/api/health`, and `/ping` endpoints configured for UptimeRobot monitoring every 5 minutes to prevent backend sleeping/snoozing on free hosting.
- **Secure Admin Dashboard:** A dedicated `/admin` route allows managing (Create, Read, Update, Delete) projects, publications, achievements, and messages directly from the browser.
- **Dynamic CV Manager:** Upload and manage your CV (PDF) from the Admin Panel. Features live PDF download and dynamic navbar integration.
- **Contact Message Dashboard:** View all contact submissions directly from the admin panel with one-click email reply shortcuts.
- **Transactional Email Routing:** Submissions are automatically forwarded to your inbox via the Resend API (with Nodemailer SMTP fallback).

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS, FontAwesome, Cloudflare Pages
- **Backend:** Node.js, Express.js, Nodemailer, Resend SDK, Render
- **Database:** MongoDB Atlas
- **Authentication:** Google Sign-In API (for the Admin Panel)
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

- [Node.js](https://nodejs.org/) (v16 or higher)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local MongoDB instance)
- A Google Cloud Console project (for OAuth credentials)
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
   Create a `.env` file in the root directory (already included in `.gitignore`):
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   RESEND_API_KEY=your_resend_api_key
   GMAIL_USER=your_email@gmail.com
   GMAIL_PASS=your_gmail_app_password
   ```

4. **Set Up Google OAuth (Admin Panel):**
   - In `admin.html`, update the client ID in the Google Sign-In element to match yours.
   - Update the `authorizedEmail` variable in `admin.html` with your Google email.

5. **Run the Application:**
   ```bash
   npm start
   ```
   *The server will start at `http://localhost:3000` and automatically seed initial database entries if collections are empty.*

---

## 📂 Project Structure

- `index.html`: The main landing page showcasing the portfolio and projects.
- `admin.html`: The secure dashboard for managing content and viewing messages.
- `server.js`: The Express.js backend handling API requests, health monitoring, cache middleware, and email forwarding.
- `wrangler.toml`: Cloudflare Pages deployment configuration.
- `.env`: Stores sensitive database links and API keys locally.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Syeed7682/Portfolio/issues).

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Built with ❤️ by [Kha. Mo. Syeed Asif](https://github.com/Syeed7682)*
