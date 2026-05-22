# 🇳🇱 Delft Dutch App

A full-stack, Progressive Web Application (PWA) designed to help users learn Dutch efficiently using the Delft method. Built with a modern React framework and a cloud database, this app is fully installable on mobile devices.

## 🚀 Live Demo & Download

* **🌐 Web Version:** [Play Live on Vercel](https://delft-method-dutch-app.vercel.app/)
* **📱 Android App (APK):** [Download the latest .apk](https://github.com/EnesVeli delft_Method-dutch-app/releases/tag/v1.0)

## ✨ Features

* **40 Interactive Lessons:** Read, listen, and practice A1 level Dutch vocabulary.
* **Progress Tracking:** Cloud-synced database to track your learning journey.
* **Secure Admin Dashboard:** Custom middleware authentication to protect sensitive routes.
* **Fully Native PWA:** Installable directly to iOS and Android home screens with offline capabilities and a custom Service Worker.

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Node.js, Next.js API Routes, Next.js Middleware (Basic Auth)
* **Database:** MongoDB Atlas (Mongoose)
* **Deployment:** Vercel (Web), PWABuilder (Android APK)

## 💻 Local Development Setup

To run this project on your local machine:

1. Clone the repository:
   ```bash
   git clone [https://github.com/EnesVeli/delft_Method-dutch-app.git](https://github.com/EnesVeli/delft_Method-dutch-app.git)

2. Install the dependencies:
   npm install

3. Create a .env file in the root directory and add your secret keys:
    MONGODB_URI="your_mongodb_connection_string"
    ADMIN_PASSWORD="your_secure_password"

4. npm run dev

5. Open http://localhost:3000 in your browser.