# Architecture — Student Digital Twin AI

## Overview

The platform is a **3-service microservice architecture** wired with REST APIs and protected by JWT/NextAuth.

```
   ┌──────────────┐
   │   Browser    │
   └──────┬───────┘
          │  HTTPS
          ▼
   ┌─────────────────────────┐
   │  Frontend (Next.js 14)  │  ◀── server-side NextAuth session
   │  Vercel · App Router    │
   └────────────┬────────────┘
        REST     │  Bearer token
                 ▼
   ┌─────────────────────────┐
   │ Backend (Express)       │
   │ Render · MongoDB Atlas  │
   └───────┬─────────────────┘
           │ axios
           ▼
   ┌─────────────────────────┐
   │ AI Service (FastAPI)    │
   │ Railway/Render          │
   │ scikit-learn pipelines  │
   └─────────────────────────┘
```

## Why three services?

- **Separation of concerns.** The web UI, business logic, and ML predictions evolve at different speeds.
- **Scalability.** Heavy ML inference can be horizontally scaled independently of the API.
- **Polyglot.** Node.js is best at glue/IO; Python is the home of scikit-learn / pandas.
- **Resilience.** When the AI service is offline, the Node backend falls back to safe defaults so the UI never breaks.

## Data flow

1. User logs in via NextAuth (Credentials provider).
2. NextAuth calls the Express `/auth/login`, which validates against MongoDB and returns a JWT.
3. The frontend stores the token in `localStorage` and attaches it via an Axios interceptor.
4. Pages call the Express API for analytics + persistence.
5. Express calls the FastAPI service for ML predictions and stores the result in Mongo.
6. The UI renders charts (Recharts), animated KPI cards, and AI insights.

## Models

| Model | Purpose | Inputs |
| --- | --- | --- |
| Burnout | RandomForestRegressor | attendance, assignments, stress, sleep, study hours |
| Performance | GradientBoostingRegressor | attendance, assignments, hours, consistency, focus |
| Productivity | RandomForestRegressor | typing wpm, active minutes, breaks, mood, accuracy |
| Stress | Heuristic (mood + sleep + sentiment) | mood, sleep, journal note |

All trained on synthetic data on startup. Swap with real data later.

## Security

- Password hashing with bcrypt (10 rounds)
- JWT (HS256) tokens, 7-day expiry by default
- Helmet HTTP headers
- CORS allow-list via `CORS_ORIGIN`
- Rate limit: 120 req/min/IP on `/api/*`
- Input validation via `express-validator`
- MongoDB injection prevention via Mongoose schemas
