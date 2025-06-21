🛒 ItemCatalog
ItemCatalog is a modern web application designed to let users add, view, and enquire about items efficiently. It supports user authentication, image uploads via Cloudinary, dynamic routing, and a polished UI — making it suitable for personal listings or internal catalog systems.

🔥 Features
🔐 User Authentication — Secure login/signup with JWT tokens

📥 Add Items — Upload item details and images (cover + additional)

🔍 View Items — Browse all items and your own listings

✉️ Enquiry System — Send messages to item owners via email

🎨 Dark/Light Mode — Theme toggle for better accessibility

📦 State Management — Zustand used for managing global state

🌐 Optimized API — Built-in Next.js API routes for server logic

🛠 Tech Stack
Framework: Next.js 15 (App Router)

UI: Tailwind CSS + daisyUI

State Management: Zustand

Database: MongoDB with Mongoose

Image Uploads: Cloudinary

Email Service: Nodemailer

Authentication: JWT

⚙️ Project Setup
1. Clone the Repo
git clone https://github.com/your-username/itemcatalog.git
cd itemcatalog
2. Install Dependencies
npm install

4. Set up .env File
Create a .env file in the root directory:
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password

TO_EMAIL=receiver_email@example.com

4. Run Dev Server
npm run dev
App runs at: http://localhost:3000
