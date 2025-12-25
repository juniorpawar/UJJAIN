# Django + React Full Project Run Guide

---

## Prerequisites

Ensure the following are installed on your system:

- Python >= 3.9
- Node.js >= 18
- npm or yarn
- Git

Check versions:

```bash
python --version
node --version
npm --version


Project Structure

project-root/
│
├── backend/                # Django backend
│   ├── manage.py
│   ├── requirements.txt
│   └── backend/
│
├── frontend/               # React frontend
│   ├── package.json
│   ├── vite.config.js / cra config
│   └── src/
│
└── README.md


Backend Setup (Django)
Step 1: Go to backend folder
cd backend

Step 2: Create virtual environment

Windows

python -m venv venv
venv\Scripts\activate


Linux / macOS

python3 -m venv venv
source venv/bin/activate

Step 3: Install backend dependencies
pip install -r requirements.txt

Step 4: Database migrations
python manage.py makemigrations
python manage.py migrate

Step 5: Create superuser (optional)
python manage.py createsuperuser

Step 6: Run Django server
python manage.py runserver


Backend will be available at:

http://127.0.0.1:8000/

Frontend Setup (React)
Step 1: Go to frontend folder
cd frontend

Step 2: Install frontend dependencies
npm install


or

yarn

Step 3: Start React development server
npm run dev


or (Create React App)

npm start


Frontend will be available at:

http://localhost:5173/   (Vite)
http://localhost:3000/   (CRA)

Connecting Frontend with Backend
API Base URL (React)
const API_BASE_URL = "http://127.0.0.1:8000";

CORS Configuration (Django)

Install CORS headers:

pip install django-cors-headers


Update settings.py:

INSTALLED_APPS = [
    "corsheaders",
    ...
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    ...
]

CORS_ALLOW_ALL_ORIGINS = True

Environment Variables (Optional)
Backend .env
DEBUG=True
SECRET_KEY=your_secret_key

Frontend .env
VITE_API_URL=http://127.0.0.1:8000

Running the Project

Start Django backend

Start React frontend

Open frontend URL in browser

React communicates with Django APIs

Build Frontend for Production
npm run build


Build files will be generated in dist/ or build/ folder.

Common Issues
Port already in use
python manage.py runserver 8001

Dependency missing
pip install <package-name>

CORS Error

Ensure backend is running

Check API URL

Verify CORS settings

Tech Stack

Frontend: React, Vite, HTML, CSS, JavaScript

Backend: Django, Django REST Framework

Database: SQLite / PostgreSQL / MongoDB

Author

Yuvraj Singh Pawar
```
