# Sule Zeen

Sule Zeen is a Nigerian technology company operating across two practices: commodity supply-chain infrastructure and cybersecurity. ZeenTheCyber remains a distinct product brand. The proposed Sule Zeen Studio is a media and learning extension drawing on those practices, initially focused on digital safety for emerging creators and small online businesses. The company positioning is **Build trust. Create opportunity.**

The public site introduces the proposed Studio at `/studio`, the technology practices at `/supply-chain` and `/cybersecurity`, and the product portfolio at `/products`. Shared company copy lives in `src/lib/company.ts`. The Studio is explicitly in development; sample episode concepts are not published content. Signal Desk is an internal surface with its existing access controls.

The editable brand and funding-application drafts are in `docs/brand/sule-zeen-100-dreams/`. They use the official 100 Dreams programme as the working interpretation of the requested UAE opportunity. The website makes no claim of programme affiliation, selection, funding, or established UAE operations.

The site retains its existing canonical domain and contact details until replacements are supplied. Set `NEXT_PUBLIC_SITE_URL` when the new company domain is configured. This repository contains the company website; the supply-chain page describes the platform and does not implement warehouse, finance, escrow, or ledger operations.

## 🚀 Introduction

**Sule Zeen** is a company website for supply-chain infrastructure and cybersecurity. It features a robust quote request system, user authentication, interactive data visualizations, and is powered by a cutting-edge tech stack including Next.js for the frontend and Firebase for the backend.

The project also integrates AI functionalities using **Google's Genkit**, showcasing the potential for intelligent, data-driven features.

## ✨ Key Features

- **Modern Frontend**: Built with **Next.js 16** and the App Router for a fast, server-rendered React experience.
- **Sleek UI/UX**: Styled with **Tailwind CSS** and a component library from **shadcn/ui**, ensuring a consistent and visually appealing design.
- **User Authentication**: Secure user sign-up and login functionality powered by **Firebase Authentication**.
- **Quote Request System**: Customers can request quotes, and administrators receive instant email notifications. The app now prefers the Resend service (if configured) with an SMTP/Nodemailer fallback.
- **Live Threat Intelligence**: Public-facing exposure metrics sourced at request time from the **CISA KEV** catalogue, **NIST NVD**, and **FIRST EPSS**. No figure on the site is illustrative; a failed feed renders an explicit unavailable state rather than a placeholder number.
- **Open-Source Stack Telemetry**: Live GitHub metrics for the deployed defensive stack (Wazuh, Suricata, Zeek, OpenCTI, MISP, Falco, osquery, Trivy, Sigstore, Sigma, Velociraptor, DFIR-IRIS).
- **Signal Desk**: An internal-only operations console at `/signal-desk`, gated by a kill switch, optional IP allowlist, and constant-time Basic auth.
- **Data Visualization**: Interactive charts implemented with **Recharts**, using a palette validated for colour-vision deficiency in both light and dark themes.
- **AI Integration**: Utilizes **Google's Genkit** for building and managing AI-powered features.
- **Form Handling**: Robust and type-safe forms using **React Hook Form** and **Zod** for validation.

## 🛡️ Security Features

Security is a top priority for Sule Zeen. The application is built with a multi-layered security approach to protect user data and prevent common web vulnerabilities.

- **API Endpoint Protection**:
  - **Input Validation**: All API routes use **Zod** to enforce strict data schemas, protecting against injection attacks, Cross-Site Scripting (XSS), and malformed data payloads.
  - **Rate Limiting**: API endpoints are protected with **Upstash Rate Limiting** to prevent brute-force attacks and mitigate Denial-of-Service (DoS) attempts.
- **Secrets Management**: Follows the Twelve-Factor App methodology by storing all credentials (API keys, database secrets) in environment variables. The `.gitignore` file is configured to ensure these secrets are never committed to version control.
- **Database Security**: Designed to use **Firebase Security Rules**, which provide granular, server-side access control to the Firestore database, ensuring users can only access the data they are permitted to.
- **Authentication**: Implements secure user sign-up and login functionality using **Firebase Authentication**, a trusted and battle-tested identity platform.
- **Internal Surface Isolation**: The Signal Desk lives under its own route group with separate chrome, is absent from the sitemap and all public navigation, and is enforced at the edge in `src/proxy.ts` before any page or loader runs. Access control is covered by `npm run test:access` (38 cases).
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
| **Charts**    | Recharts                                                                                                                                                                                                                                           |
| **Intel feeds** | CISA KEV, NIST NVD, FIRST EPSS, GitHub REST API                                                                                                                                                                                                  |
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
