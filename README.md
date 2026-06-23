# 🕵️ Secret Drop

> **Where your identity remains a secret.**

Secret Drop is an anonymous messaging platform where users can receive honest, unfiltered messages through a unique public profile link — no sender identity revealed.

🌐 **Live Demo:** [secret-drop-mauve.vercel.app](https://secret-drop-mauve.vercel.app)

---

## ✨ Features

- 🔗 **Unique Public Profile Link** — Share your link, anyone can message you anonymously
- 🔐 **Secure Authentication** — Email/username login with NextAuth.js
- ✉️ **Email Verification** — Verify your account via Resend email service
- 📬 **Message Management** — Accept or pause incoming messages from your dashboard
- 🗑️ **Delete Messages** — Remove any message from your inbox
- 📱 **Responsive UI** — Clean, mobile-friendly design with Tailwind CSS & shadcn/ui

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Authentication | NextAuth.js v4 |
| Database | MongoDB + Mongoose |
| Email | Resend + React Email |
| UI | shadcn/ui + Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (e.g. MongoDB Atlas)
- Resend account for emails

### Installation

```bash
# Clone the repository
git clone https://github.com/Diab0licaI/Secret_Drop.git
cd Secret_Drop/secret_message

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your values (see Environment Variables section)

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env.local` file in the root with the following:

```env
# App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Database
MONGODB_URI=your_mongodb_connection_string

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# AI (Google Gemini)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── verify/
│   ├── api/
│   │   ├── auth/
│   │   ├── sign-up/
│   │   ├── verify-code/
│   │   ├── send-message/
│   │   ├── get-messages/
│   │   ├── delete-message/
│   │   └── accept-messages/
│   ├── dashboard/
│   └── u/[username]/
├── components/
├── models/
├── schemas/
├── lib/
└── proxy.ts          # Next.js 16 Middleware
```

---

## 📸 How It Works

1. **Sign up** with your email and verify your account
2. **Get your unique link** — `secret-drop-mauve.vercel.app/u/yourusername`
3. **Share it** anywhere — social media, bio, etc.
4. **Receive anonymous messages** in your dashboard
5. **Toggle** message acceptance on/off anytime

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---


<p align="center">Made with ❤️ by <a href="https://github.com/Diab0licaI">Diab0lical</a></p>
