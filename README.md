# Dynamic Personal Portfolio

Welcome to the source code of my dynamic, full-stack personal portfolio! This website is designed to showcase my projects, research publications, events, and achievements in an interactive, high-performance manner.

## 🌟 Features

- **Modern & Responsive UI:** Built with HTML5, vanilla JavaScript, and Tailwind CSS. Features a sleek dark theme with glassmorphism effects and smooth micro-animations.
- **Ultra-Fast Database Caching:** Portfolio data is combined and served using an in-memory caching system, reducing database query overhead and making the page load virtually instant (under 20ms).
- **Secure Admin Dashboard:** A dedicated `/admin` route allows you to manage (Create, Read, Update, Delete) projects, publications, achievements, and messages directly from the browser.
- **Dynamic Hire Me (CV) Manager:** Upload your CV (PDF) from the Admin Panel setting. A "Hire Me (CV)" download button with a cursor-following live PDF preview is dynamically injected into your home page navbar and hero sections upon upload.
- **Contact Message Dashboard:** View all contact submissions directly from the admin panel, complete with details and a quick "Reply via Email" mailto action.
- **Transactional Email Routing:** Submissions are automatically forwarded to your Gmail inbox via the Resend API (with a Nodemailer SMTP fallback).

## 🛠️ Technology Stack

- **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS, FontAwesome
- **Backend:** Node.js, Express.js, Nodemailer, Resend SDK, Dotenv
- **Database:** MongoDB Atlas
- **Authentication:** Google Sign-In API (for the Admin Panel)

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

## 📂 Project Structure

- `index.html`: The main landing page showcasing the portfolio and projects.
- `admin.html`: The secure dashboard for managing content and viewing messages.
- `server.js`: The Express.js backend handling API requests, cache middleware, and email forwarding.
- `.env`: Stores sensitive database links and API keys locally.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Syeed7682/Portfolio/issues).

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Built with ❤️ by [Kha. Mo. Syeed Asif](https://github.com/Syeed7682)*
