# MLAR – Maple Leaf Animal Rescue 🐾

This is a full-stack web application built with **Next.js**, **React**, **Tailwind CSS**, and **MongoDB**.  
It allows users to browse adoptable pets and submit adoption applications, while admins can manage animals and review applications.

---

## 🚀 Getting Started

### 1. Install Dependencies

After cloning the repository or unzipping the project folder, install the required packages:

```bash
npm install
```

---

### 2. Set Up Environment Variables

Create a `.env.local` file in the root of the project:

```env
# .env.local (do not include this file in GitHub or your ZIP submission)

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

---

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 👥 Access Levels

- **Regular Users**:  
  Can browse animals and submit adoption forms

- **Admins**:  
  Can log in to the admin dashboard, review adoption applications, and manage the animal list (CRUD)

---

## 🧰 Tech Stack

- **Frontend**: Next.js 15 (React 19), Tailwind CSS
- **Backend**: MongoDB, REST API, bcryptjs
- **Authentication**: NextAuth.js with MongoDB adapter
- **Styling**: Tailwind CSS
- **Other**: React Icons

---

## 💻 Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

---

## 🔒 Notes

- `node_modules` is excluded from the ZIP to reduce size.
- `.env.local` is **not included** due to sensitive information. See example above.
- `.gitignore` is included to prevent committing sensitive or unnecessary files.
