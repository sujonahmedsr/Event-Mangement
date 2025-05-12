# 🎉 Event Planner & Participation System

A secure, role-based event management platform where users can create, join, and manage events with advanced participation and payment workflows. Designed for professional event hosting—be it free, paid, public, or private—with integrated payments and participant controls.

---

## 🌐 Live Links

- **Frontend:** [https://bong-events-a9.vercel.app](https://bong-events-a9.vercel.app)
- **Backend/API:** [https://event-mangement-zeta.vercel.app](https://event-mangement-zeta.vercel.app)

- **Admin Credentials:**
  - Email: `admin@gmail.com`
  - Password: `123456`

---

## ✨ Features

### 🔐 Authentication
- JWT-based secure login/signup system
- Role-based access control (Admin, User)

### 📅 Event Management
- Create, edit, delete events (Public or Private, Free or Paid)
- Four event types:
  - Public Free: Join instantly
  - Public Paid: Pay → Pending approval
  - Private Free: Request to Join → Pending
  - Private Paid: Pay & Request → Pending

### 💳 Payment Integration
- Integrated with SSLCommerz
- Event creators can charge a fee during event creation
- Join process requires successful payment before approval

### 📥 Participation Workflows
- Instant join for public free events
- Payment + approval workflow for paid events
- Request to join for private events
- Invite system for private/paid events with Pay & Accept option

### 👨‍💼 Admin Panel
- Manage all events, users, and reported content
- Delete inappropriate events/accounts

### 🧑‍💻 User Dashboard
- Manage personal events and invitations
- Accept or decline invitations
- Post and edit reviews after events

### 🌐 Pages & Layout
- **Home:** Slider of featured events
- **Events Page:** Filter by event type + search bar
- **Event Details:** Dynamic participation actions + host tools
- **Dashboard:** Sidebar + main area (Events, Invitations, Reviews, Settings)
- **Additional Pages:** About, Contact, Privacy Policy, FAQ

---

## 🛠️ Tech Stack

| Category         | Technologies                                    |
|------------------|--------------------------------------------------|
| **Frontend**     | Next.js, Tailwind CSS                            |
| **Backend**      | Node.js, Express.js                              |
| **Database**     | PostgreSQL (via Prisma ORM)                      |
| **Auth**         | JSON Web Tokens (JWT)                            |
| **Payments**     | SSLCommerz           
| **Deployment**   | Vercel (Frontend), Render (Backend)

---

## 🚀 Setup Instructions

### 1. Clone Repositories

```bash
git clone https://github.com/sujonahmedsr/Event-Mangement.git
