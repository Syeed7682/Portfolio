# Dynamic Personal Portfolio

Welcome to the source code of my dynamic, full-stack personal portfolio! This website is designed to showcase my projects, research publications, events, and achievements in an interactive and visually appealing manner.

## 🌟 Features

- **Modern & Responsive UI:** Built with HTML5, vanilla JavaScript, and Tailwind CSS. Features a sleek dark theme with glassmorphism effects and smooth micro-animations.
- **Dynamic Content:** All major sections (Projects, Events, Certificates, Publications) are fetched dynamically from a MongoDB database, ensuring the portfolio is always up-to-date.
- **Secure Admin Dashboard:** A dedicated `/admin` route protected by Google OAuth allows authorized users to manage (Create, Read, Update, Delete) portfolio content directly from the browser without touching the code.
- **Interactive Filtering:** Easily filter projects by category (e.g., AI/ML, Data Science, Web App) through an intuitive UI.
- **Integrated Contact Form:** Allows visitors to easily reach out via FormSubmit.

## 🛠️ Technology Stack

- **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS, FontAwesome
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Google Sign-In API (for the Admin Panel)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local MongoDB instance)
- A Google Cloud Console project (for OAuth credentials)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Syeed7682/portfolio-main.git
   cd portfolio-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (or set environment variables locally) and add your MongoDB URI and port:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. **Set Up Google OAuth (Admin Panel):**
   - In `admin.html`, update the `data-client_id` in the Google Sign-In `<div id="g_id_onload">` with your own Client ID.
   - Update the `authorizedEmail` variable in the `admin.html` script block to match your personal Google email.

5. **Run the Application:**
   ```bash
   npm start
   ```
   *The server will start at `http://localhost:3000` and automatically seed initial data to your MongoDB if the collections are empty.*

## 📂 Project Structure

- `index.html`: The main landing page showcasing the portfolio.
- `admin.html`: The secure dashboard for managing content.
- `server.js`: The Express.js backend handling API requests and database connections.
- `/image`: Directory storing all static assets, project screenshots, and profile pictures.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Syeed7682/portfolio-main/issues).

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Built with ❤️ by [Kha. Mo. Syeed Asif](https://github.com/Syeed7682)*
