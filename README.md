# HouseHunt 🏡

HouseHunt is a modern, full-stack Real Estate Property Management System built with the MERN stack. It allows users to browse available properties, filter by location and price, and allows registered property owners/admins to post and manage their own listings.

## 🚀 Features

* **User Authentication:** Secure login and registration using JSON Web Tokens (JWT) and bcrypt password hashing.
* **Role-Based Access Control (RBAC):** Distinct roles for standard Users (browsing) and Admins/Owners (posting and approving properties).
* **Dynamic Search & Filtering:** Real-time property filtering by location, type (Villa, Apartment, etc.), and maximum price.
* **Admin Dashboard:** A dedicated control panel for property owners to view, delete, and approve pending property listings.
* **Premium UI/UX:** Responsive, modern design featuring smooth page transitions and hover effects powered by Framer Motion.

## 💻 Tech Stack

**Frontend:**
* React.js (Vite)
* React Router DOM (for navigation)
* Axios (for API requests)
* Bootstrap & Custom CSS (for styling)
* Framer Motion (for animations)

**Backend:**
* Node.js & Express.js
* MongoDB (Mongoose ORM)
* JSON Web Tokens (JWT) for secure sessions

## 🛠️ Installation & Setup

To run this project locally, you will need Node.js and a MongoDB URI.

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/your-username/HouseHunt.git
cd HouseHunt
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`
Create a `.env` file in the `backend` directory and add the following variables:
\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
\`\`\`
Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup
Open a new terminal window:
\`\`\`bash
cd frontend
npm install
\`\`\`
Start the Vite development server:
\`\`\`bash
npm run dev
\`\`\`

## 📌 Future Enhancements
* Image upload functionality for property listings (AWS S3 or Cloudinary).
* Integrated Google Maps API for exact property locations.
* In-app messaging system between users and property owners.

---
*Developed as a Capstone Project.*