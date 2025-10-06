<div align="center">
  <!-- You can replace this with a real logo if you have one -->
  <img src="https://raw.githubusercontent.com/rythecyber/Secure-Sense/main/public/logo.png" alt="Secure-Sense Logo" width="150" />
  <h1>Secure-Sense</h1>
  <p>A modern, feature-rich web application built with Next.js, Firebase, and integrated AI capabilities.</p>

  <!-- Badges -->
  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Framework-Next.js-black?style=for-the-badge&logo=next.js" alt="Next.js"></a>
    <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Backend-Firebase-orange?style=for-the-badge&logo=firebase" alt="Firebase"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript" alt="TypeScript"></a>
    <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Deployed_On-Vercel-black?style=for-the-badge&logo=vercel" alt="Vercel"></a>
  </p>
</div>

---

## 🚀 Introduction

**Secure-Sense** is a comprehensive web platform designed to provide a seamless user experience with a focus on security and modern web technologies. It features a robust quote request system, user authentication, interactive data visualizations, and is powered by a cutting-edge tech stack including Next.js for the frontend and Firebase for the backend.

The project also integrates AI functionalities using **Google's Genkit**, showcasing the potential for intelligent, data-driven features.

## ✨ Key Features

- **Modern Frontend**: Built with **Next.js 15** and the App Router for a fast, server-rendered React experience.
- **Sleek UI/UX**: Styled with **Tailwind CSS** and a component library from **shadcn/ui**, ensuring a consistent and visually appealing design.
- **User Authentication**: Secure user sign-up and login functionality powered by **Firebase Authentication**.
- **Quote Request System**: Customers can request quotes, and administrators receive instant email notifications. The app now prefers the Resend service (if configured) with an SMTP/Nodemailer fallback.
- **Data Visualization**: Interactive charts and graphs implemented with **Recharts**.
- **3D Graphics**: Integration of **Three.js** for potential interactive 3D elements.
- **AI Integration**: Utilizes **Google's Genkit** for building and managing AI-powered features.
- **Form Handling**: Robust and type-safe forms using **React Hook Form** and **Zod** for validation.

## 🛡️ Security Features

Security is a top priority for Secure-Sense. The application is built with a multi-layered security approach to protect user data and prevent common web vulnerabilities.

- **API Endpoint Protection**:
  - **Input Validation**: All API routes use **Zod** to enforce strict data schemas, protecting against injection attacks, Cross-Site Scripting (XSS), and malformed data payloads.
  - **Rate Limiting**: API endpoints are protected with **Upstash Rate Limiting** to prevent brute-force attacks and mitigate Denial-of-Service (DoS) attempts.
- **Secrets Management**: Follows the Twelve-Factor App methodology by storing all credentials (API keys, database secrets) in environment variables. The `.gitignore` file is configured to ensure these secrets are never committed to version control.
- **Database Security**: Designed to use **Firebase Security Rules**, which provide granular, server-side access control to the Firestore database, ensuring users can only access the data they are permitted to.
- **Authentication**: Implements secure user sign-up and login functionality using **Firebase Authentication**, a trusted and battle-tested identity platform.
- **Bot & Crawler Protection**: The `robots.txt` file is configured to disallow crawlers from indexing sensitive API routes, reducing the public-facing attack surface.
- **Dependency Scanning**: The development workflow includes regular auditing of third-party packages to identify and patch known vulnerabilities.

## 🛠️ Tech Stack

| Category      | Technology                                                                                                                                                                                                                                                                                         |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework** | Next.js, React                                                                                                                                                                                                                                        |
| **Language**  | TypeScript                                                                                                                                                                                                                                                         |
| **Styling**   | Tailwind CSS, shadcn/ui, clsx, tailwind-merge                                                                                                                      |
| **Backend**   | Firebase (Authentication, Firestore), Nodemailer                                                                                                                                                                                          |
| **AI**        | Google Genkit                                                                                                                                                                                                                                           |
| **Forms**     | React Hook Form, Zod                                                                                                                                                                                                                               |
| **Graphics**  | Three.js, Recharts                                                                                                                                                                                                                                 |
| **Deployment**| Vercel (Recommended)                                                                                                                                                                                                                                                          |

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.18.0 or later)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/rythecyber/Secure-Sense.git
cd Secure-Sense
```

### 2. Install Dependencies

Install all the required packages using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project. This file will hold your secret keys for services like Firebase and your email provider.

```bash
touch .env.local
```

Add the following configuration to your `.env.local` file. Replace the placeholder values with your actual credentials.

```env
# Firebase Configuration
# Get these from your Firebase project settings
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

## Email / Resend configuration

The project supports Resend as the primary mailer. If you configure `RESEND_API_KEY`, the app will use Resend; otherwise it falls back to Nodemailer SMTP.

Add these to `.env.local`:

```env
# Resend (preferred)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=no-reply@yourdomain.com   # verified sender
ADMIN_EMAIL=team@yourdomain.com       # recipient for quote requests
RESEND_WEBHOOK_SECRET=your_webhook_secret # optional, for verifying webhooks

# Optional SMTP fallback (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_USER=your-email@example.com
SMTP_PASS=your-smtp-password
```

# Upstash Redis for Rate Limiting
UPSTASH_REDIS_REST_URL="your-upstash-redis-rest-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-rest-token"
```

> **Security Note**: The `.env.local` file is listed in `.gitignore` and should **never** be committed to your repository.

### 4. Run the Development Server

Start the Next.js development server on `http://localhost:9002`.

```bash
npm run dev
```

Open http://localhost:9002 in your browser to see the application.

## 🚀 Deployment

This application is optimized for deployment on Vercel, the creators of Next.js.

1.  Push your code to a Git repository (e.g., GitHub).
2.  Import your project into Vercel.
3.  Add your environment variables from `.env.local` to the Vercel project settings.
4.  Deploy! Vercel will automatically build and deploy your application.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  Made with ❤️ by rythecyber
</div>
