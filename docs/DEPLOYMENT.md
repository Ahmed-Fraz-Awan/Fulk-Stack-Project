# Deployment Guide — Student Digital Twin AI

This guide walks you through deploying the full stack to production using free or low-cost cloud services.

## Architecture

- **Frontend** → Vercel (Next.js)
- **Backend** → Render (Node.js)
- **AI Service** → Railway or Render (FastAPI)
- **Database** → MongoDB Atlas (free M0 tier)

---

## 1. MongoDB Atlas

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create an **M0 Free** cluster
3. Add a database user (username + strong password)
4. Network access → **Allow from anywhere** (`0.0.0.0/0`) for now
5. Click **Connect → Drivers → Node.js** and copy the connection string. It looks like:
   ```
   mongodb+srv://<user>:<pass>@cluster0.xxxx.mongodb.net/sdt?retryWrites=true&w=majority
   ```
   Save it as `MONGODB_URI`.

---

## 2. Deploy the AI Service

### Option A — Railway

1. Create a new project at [railway.app](https://railway.app)
2. Add **GitHub repo** as a service. Set the **root directory** to `ai-service`.
3. Railway auto-detects the `Dockerfile`. Deploy.
4. Copy the public URL (e.g. `https://sdt-ai.up.railway.app`).

### Option B — Render

1. New → **Web Service** → connect repo
2. **Root directory:** `ai-service`
3. **Build command:** `pip install -r requirements.txt`
4. **Start command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. **Environment:** Python 3.11
6. **Health Check Path:** `/health`

Save the deployed URL as `AI_SERVICE_URL`.

---

## 3. Deploy the Backend (Render)

1. New → **Web Service** → connect your GitHub repo
2. **Root directory:** `backend`
3. **Build command:** `npm install`
4. **Start command:** `node src/server.js`
5. **Health Check Path:** `/health`
6. **Environment variables:**

   | Key | Value |
   | --- | --- |
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `MONGODB_URI` | *(from step 1)* |
   | `JWT_SECRET` | *(generate 64+ char random string)* |
   | `AI_SERVICE_URL` | *(from step 2)* |
   | `CORS_ORIGIN` | `https://your-frontend.vercel.app` |

7. Deploy. Copy the URL → save as `API_URL`.

---

## 4. Deploy the Frontend (Vercel)

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com), **New Project**, import the repo.
3. **Root directory:** `frontend`
4. **Framework:** Next.js (auto-detected)
5. **Environment variables:**

   | Key | Value |
   | --- | --- |
   | `NEXT_PUBLIC_API_URL` | `https://your-backend.onrender.com/api` |
   | `NEXT_PUBLIC_AI_URL` | `https://your-ai-service.up.railway.app` |
   | `NEXTAUTH_URL` | `https://your-frontend.vercel.app` |
   | `NEXTAUTH_SECRET` | *(generate random secret)* |

6. Deploy. Visit your Vercel URL.

---

## 5. Seed the database (optional)

After the backend is live and `MONGODB_URI` is set, run locally:

```bash
cd backend
npm install
# Set MONGODB_URI in your local .env
npm run seed
```

This creates 10 students + 1 admin with full historical data.

---

## 6. Post-deploy checklist

- [ ] `https://<frontend>/` loads with hero animation
- [ ] `https://<backend>/health` returns `{ ok: true }`
- [ ] `https://<ai>/health` returns `{ ok: true }`
- [ ] Login with `demo@twin.ai / demo1234` works
- [ ] Dashboard charts render
- [ ] AI Twin page shows predictions
- [ ] AI assistant replies

---

## Common Issues

**CORS errors.** Make sure `CORS_ORIGIN` on the backend includes the exact Vercel URL (no trailing slash).

**`/api/auth/signin` 500 in production.** Set `NEXTAUTH_URL` to your live frontend URL and `NEXTAUTH_SECRET` to a long random value.

**Mongo can't connect.** Atlas requires your hosting provider's egress IPs. Use `0.0.0.0/0` for simplicity, or whitelist Render/Railway IP ranges.

**Cold starts on free tier.** Render & Railway free tiers sleep after inactivity. First request after sleep can take 30–60s — acceptable for demos.

---

## Production hardening (next steps)

- Move secrets to a vault (Doppler, Infisical, AWS SM)
- Add a CDN in front of the backend
- Enable Mongo backups
- Add Sentry for error tracking
- Replace the rule-based chat assistant with an LLM (OpenAI, Anthropic)
- Train ML models on real, anonymized student data and persist with `joblib`
