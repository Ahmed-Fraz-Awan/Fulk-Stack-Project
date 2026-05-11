# Student Digital Twin AI

**An AI-powered digital twin of a student.** It learns from attendance, study time, typing rhythm, and mood signals — then predicts performance, burnout, focus, and the optimal moments to study.

Built as a portfolio-grade, production-ready, cloud-deployable monorepo:

| Service | Stack | URL (dev) |
| --- | --- | --- |
| Frontend | Next.js 14 · TypeScript · Tailwind · Framer Motion · ShadCN · Recharts · Zustand · NextAuth | http://localhost:3000 |
| Backend | Node.js · Express · MongoDB Atlas · JWT · Helmet · Mongoose | http://localhost:5000 |
| AI Service | Python · FastAPI · scikit-learn · pandas · numpy | http://localhost:8000 |

> The app is fully usable **even when the backend or AI service is offline** — every screen falls back to rich mock data, perfect for demos.

### Go live (not localhost)

Follow **[docs/QUICK_DEPLOY.md](docs/QUICK_DEPLOY.md)** — Render Blueprint (`render.yaml`) + Vercel + MongoDB Atlas. I cannot sign into your cloud accounts; that guide is the fastest path to a public URL.

---

## ✨ Features

- **AI Digital Twin** that learns each student's behavior model
- **Burnout prediction** + **performance prediction** + **productivity prediction** (real scikit-learn models trained on synthetic data at boot)
- **Smart Study Planner** built around your peak focus window
- **Mood & Stress Analyzer** with daily check-ins
- **Typing Pattern Analyzer** → focus & engagement score
- **AI Chat Assistant** that explains the "why" behind every insight
- **Advanced Analytics** with rich animated charts (Recharts)
- **Admin Cohort Dashboard** for monitoring all students
- **PDF + CSV exports**, dark/light theme, glassmorphism UI
- **Role-based access** (student / admin) with JWT + NextAuth
- **Security**: Helmet, CORS, rate limiting, password hashing, input validation
- **DevOps**: Docker for every service, `docker-compose`, GitHub Actions CI, Vercel/Render/Railway configs

---

## 🏗 Architecture

```
┌────────────────────┐      REST       ┌──────────────────────┐
│  Next.js Frontend  │ ───────────────▶│  Express Backend     │
│  (Vercel)          │◀─── JWT ────────│  (Render · MongoDB)  │
└────────┬───────────┘                 └──────────┬───────────┘
         │                                        │
         │           direct dashboard calls       │
         └───────────────────┐    ┌───────────────┘
                             ▼    ▼
                    ┌─────────────────────────┐
                    │   FastAPI AI Service    │
                    │  scikit-learn models    │
                    │  (Railway / Render)     │
                    └─────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────────┐
                    │   MongoDB Atlas         │
                    └─────────────────────────┘
```

---

## 📁 Folder Structure

```
.
├── frontend/                  # Next.js 14 App Router
│   ├── src/
│   │   ├── app/
│   │   │   ├── (public)/       # landing, features, about
│   │   │   ├── (auth)/         # login, signup
│   │   │   ├── (dashboard)/    # student + admin pages
│   │   │   └── api/auth/       # NextAuth route
│   │   ├── components/         # ui, landing, dashboard, charts
│   │   ├── lib/                # api client, utils, mock data
│   │   ├── store/              # Zustand stores
│   │   └── types/
│   ├── tailwind.config.ts
│   ├── next.config.mjs
│   └── Dockerfile
│
├── backend/                   # Express REST API
│   ├── src/
│   │   ├── config/             # env + db
│   │   ├── controllers/        # auth, analytics, ai, planner, mood, typing, admin, notifications
│   │   ├── middleware/         # auth, error, validate
│   │   ├── models/             # User, Attendance, Assignment, ProductivityData, MoodLog, TypingAnalytics, Prediction, Notification, PlannerItem
│   │   ├── routes/
│   │   ├── services/           # aiClient
│   │   ├── seed/               # seed.js
│   │   ├── app.js
│   │   └── server.js
│   └── Dockerfile
│
├── ai-service/                # FastAPI ML microservice
│   ├── app/
│   │   ├── routers/            # predictions, recommendations, chat
│   │   ├── schemas/            # pydantic models
│   │   ├── services/           # ml_models, recommendations, assistant
│   │   └── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── docs/                      # deployment guide + diagrams
├── docker-compose.yml         # whole stack with one command
└── .github/workflows/ci.yml   # GitHub Actions CI
```

---

## 🚀 Quick Start (Local)

### Option A — Docker (easiest)

```bash
docker compose up --build
```

That spins up Mongo, the AI service, the backend, and the frontend. Open `http://localhost:3000`.

### Option B — Run each service yourself

**1. Frontend**

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev    # http://localhost:3000
```

**2. Backend**

```bash
cd backend
cp .env.example .env
npm install
npm run dev    # http://localhost:5000
npm run seed   # seed Atlas with demo users (optional, requires MONGODB_URI)
```

**3. AI Service**

```bash
cd ai-service
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000     # http://localhost:8000/docs
```

---

## 🔐 Demo Accounts

The login page is pre-filled with a demo account that works **even without a backend**:

| Role | Email | Password |
| --- | --- | --- |
| Student (offline-friendly) | `demo@twin.ai` | `demo1234` |
| Admin (after seeding DB) | `admin@twin.ai` | `admin1234` |
| Student (after seeding) | `aarav.sharma@univ.edu` | `student1234` |

---

## 🔌 API Reference (summary)

### Auth (`/api/auth`)
- `POST /signup` — `{ name, email, password, role? }`
- `POST /login` — `{ email, password }`
- `GET  /me`

### Analytics (`/api/analytics`)
- `GET /dashboard` — KPIs, weekly trends, subjects, AI insights
- `GET /attendance`
- `GET /productivity`

### AI (`/api/ai`) — proxies the FastAPI service
- `POST /burnout`
- `POST /performance`
- `POST /productivity`
- `POST /recommendations`
- `POST /chat`

### Planner (`/api/planner`)
- `GET /` · `POST /` · `PUT /:id` · `DELETE /:id`

### Mood (`/api/mood`)
- `GET /` · `POST /`

### Typing (`/api/typing`)
- `GET /` · `POST /`

### Admin (`/api/admin`, role: `admin`)
- `GET /students`
- `GET /summary`

### Notifications (`/api/notifications`)
- `GET /`
- `PATCH /:id/read`

### FastAPI service (port 8000)
- `POST /predictions/burnout`
- `POST /predictions/performance`
- `POST /predictions/productivity`
- `POST /predictions/stress`
- `POST /recommendations/planner`
- `POST /chat/assistant`
- `GET  /health` · `GET /docs`

---

## 🧠 ML Models

- Trained at service boot on **synthetic** but realistic distributions of student behavior signals.
- `RandomForestRegressor` for **burnout** and **productivity**
- `GradientBoostingRegressor` for **performance**
- Scikit-learn `Pipeline` with `StandardScaler`
- Easy to swap with real datasets — just replace the `_synth_*` functions in `ai-service/app/services/ml_models.py`.

---

## 🎨 UI System

- **Glassmorphism** + **aurora gradients** + animated grid background
- Dark/light theme with `next-themes`
- Framer Motion page transitions, hover effects, animated counters
- Custom ShadCN-style primitives: `Button`, `Card`, `Input`, `Label`, `Badge`, `Progress`, `Tabs`, `Avatar`, `Skeleton`, `Switch`, `Textarea`, `Separator`
- Recharts area/bar/radar/donut visualizations

---

## 🚢 Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the full guide.

| Service | Recommended host | Config file |
| --- | --- | --- |
| Frontend | Vercel | `frontend/vercel.json` |
| Backend | Render | `backend/render.yaml` |
| AI service | Railway or Render | `ai-service/railway.json`, `ai-service/render.yaml` |
| Database | MongoDB Atlas (Free tier works) | — |

---

## 📸 Screenshots (placeholders)

> Add real screenshots after first deploy.

- `docs/screenshots/landing.png`
- `docs/screenshots/dashboard.png`
- `docs/screenshots/twin.png`
- `docs/screenshots/planner.png`
- `docs/screenshots/chat.png`
- `docs/screenshots/admin.png`

---

## 🤝 Contributing

PRs welcome. Please run `npm run lint` in `frontend/` and write meaningful commit messages.

## 📄 License

MIT — see [LICENSE](LICENSE).
