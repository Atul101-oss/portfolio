# 🚀 Portfolio

A full-stack personal portfolio platform built with **Django** and **React**, showcasing projects with interactive demos, a REST API, and user authentication — deployed on **Railway**.

> **Live:** [portfolio-production-6791.up.railway.app](https://portfolio-production-6791.up.railway.app)

---

## ✨ Features

- **Interactive React Frontend** — Modern SPA built with Vite, React 18, TailwindCSS 4, Radix UI, MUI, and Motion animations
- **Django REST API** — Serves project data (titles, descriptions, technologies, links, images) via DRF serializers
- **Project Showcase Pages** — Dedicated landing pages for each project:
  - 🩺 **Medical Diagnose** — AI-powered skin disease classification & drug recommendation
  - 📒 **NoteSync** — Cross-platform note syncing between Android & Linux via GitHub
  - 🎙️ **VoiceType** — Voice typing tool for Linux
- **Digital Signature App** — SHA-256 hashing & RSA key-pair generation for files and text
- **User Dashboard** — Authentication system with login, registration, and a user dashboard
- **Production-Ready** — Gunicorn, WhiteNoise for static files, CORS support

---

## 🛠️ Tech Stack

| Layer        | Technologies                                                    |
| ------------ | --------------------------------------------------------------- |
| **Backend**  | Django 6.0, Django REST Framework, SQLite, Gunicorn, WhiteNoise |
| **Frontend** | React 18, Vite, TypeScript, TailwindCSS 4, Radix UI, MUI        |
| **UI/UX**    | Motion (Framer Motion), Lucide Icons, Embla Carousel            |
| **Auth**     | Django built-in auth (login, register, logout)                  |
| **Deploy**   | Railway, Procfile, WhiteNoise static serving                    |

---

## 📁 Project Structure

```
portfolio/
├── portfolio/          # Django project settings & root URL config
├── reactHome/          # React frontend (Vite + TailwindCSS)
│   └── src/app/        #   App components & pages
├── api_v1/             # REST API — project data endpoints
├── Medical-diagnose/   # Medical diagnosis showcase app
├── notesync/           # NoteSync showcase app
├── VoiceType/          # VoiceType showcase app
├── DigitalSignature/   # Digital signature utility (hashing + RSA)
├── dashboard/          # User dashboard app
├── static/             # Compiled static assets
├── templates/          # Django HTML templates
├── manage.py           # Django management script
├── requirements.txt    # Python dependencies
└── procfile            # Railway deployment config
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm or pnpm

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Atul101-oss/portfolio.git
cd portfolio

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run migrations & start the server
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
# Navigate to the React app
cd reactHome

# Install dependencies
npm install

# Start the dev server
npm run dev
```

### Building for Production

```bash
# Build the React frontend (output goes to static/)
cd reactHome
npm run build

# Collect static files
cd ..
python manage.py collectstatic --noinput
```

---

## 🔌 API Endpoints

| Method | Endpoint                     | Description                    |
| ------ | ---------------------------- | ------------------------------ |
| GET    | `/api/v1/projects/`          | List all projects (serialized) |
| GET    | `/api/v1/projects/manual/`   | List all projects (manual)     |
| GET    | `/api/v1/project/<id>/`      | Get a single project           |
| GET    | `/api/get/`                  | Health check message           |
| POST   | `/api/post/`                 | Echo name back                 |
| POST   | `/DigitalSignature/getHash/` | Generate SHA-256 hash          |
| POST   | `/DigitalSignature/getKey/`  | Generate RSA key pair          |

---

## 🌐 Routes

| Path                 | Page                       |
| -------------------- | -------------------------- |
| `/`                  | React Home (Portfolio SPA) |
| `/medical-diagnose/` | Medical Diagnose Showcase  |
| `/notesync/`         | NoteSync Showcase          |
| `/voicetype/`        | VoiceType Showcase         |
| `/DigitalSignature/` | Digital Signature Tool     |
| `/dashboard/`        | User Dashboard             |
| `/login/`            | Login                      |
| `/register/`         | Registration               |

---

## 📦 Deployment

The app is configured for **Railway** deployment:

```
web: python manage.py migrate && python manage.py collectstatic --noinput && gunicorn portfolio.wsgi
```

Static files are served via **WhiteNoise** with compressed manifest storage.

---

## 📄 License

This project is open source. Feel free to fork and customize for your own portfolio.
