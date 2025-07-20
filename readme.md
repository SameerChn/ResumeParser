# 📄 ResumeParser

A full-stack MERN application that allows users to upload their resumes (PDF format), parses them using natural language processing, and matches the extracted content against job descriptions to generate a **match score**.

---

## 🚀 Features

- Upload resumes in PDF format
- Extract key information (name, email, skills, experience, etc.)
- Paste or input job descriptions
- Calculate and display how well a resume matches the given job description
- Score-based resume-job matching using text similarity techniques
- Intuitive and responsive UI

---

## 🛠️ Tech Stack

### 🧠 Backend
- Node.js
- Express.js
- `pdf-parse` – for extracting text from PDFs
- `natural` – for text processing and similarity scoring
- CORS, body-parser

### 💻 Frontend
- React.js
- CSS
- Lucide-react icons


---

## ⚙️ Setup Instructions

Follow the steps to run both frontend and backend locally.

cd server        # Go to the backend folder
npm install      # Install backend dependencies
npm start        # Starts the backend server at http://localhost:5000


cd client        # Go to the frontend folder
npm install      # Install frontend dependencies
npm start        # Starts the frontend at http://localhost:3000

---