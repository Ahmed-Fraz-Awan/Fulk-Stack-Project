# Quick deploy (no localhost) — ~20 minutes

I **cannot** log into your Vercel, Render, or MongoDB accounts. This guide is the **shortest path** you can follow once; after that, **git push** updates the site automatically where configured.

## What you will open in the browser

| After step | URL |
|------------|-----|
| **App (students & profs)** | `https://<something>.vercel.app` |
| **API health** | `https://<backend>.onrender.com/health` |
| **AI docs** | `https://<ai>.onrender.com/docs` |

---

## Step 1 — MongoDB Atlas (5 min)

1. [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → free cluster.
2. Database Access → create user + password.
3. Network Access → **Allow access from anywhere** (`0.0.0.0/0`) for class demos (tighten later).
4. Connect → Drivers → copy **connection string** → replace `<password>` → save as **Mongo URI**.

---

## Step 2 — Render: API + AI (10 min)

1. [dashboard.render.com](https://dashboard.render.com) → **New** → **Blueprint**.
2. Connect **GitHub** → repo `Ahmed-Fraz-Awan/Fulk-Stack-Project`.
3. Render reads the root **`render.yaml`** and creates **sdt-ai** + **sdt-backend**.
4. When prompted for **secret** / **sync false** variables, set:
   - **`sdt-backend` → `MONGODB_URI`**: paste Atlas URI from Step 1.
   - **`sdt-backend` → `CORS_ORIGIN`**: temporarily `*` *or* skip and set after Step 3 to your exact Vercel URL (recommended): `https://YOUR-APP.vercel.app` (no trailing slash).
   - **`sdt-ai` → `ALLOWED_ORIGINS`**: `https://YOUR-APP.vercel.app,https://YOUR-BACKEND.onrender.com` (use real URLs after/deploy; you can edit later).
5. Wait until both services are **Live**. Note:
   - Backend: `https://sdt-backend.onrender.com` (name may vary if you renamed).
   - AI: `https://sdt-ai.onrender.com`

Test: open `https://<backend>/health` → should return JSON `ok: true`.

---

## Step 3 — Vercel: frontend (5 min)

1. [vercel.com](https://vercel.com) → **Add New** → **Project** → import the same GitHub repo.
2. **Root Directory** → set to **`frontend`**.
3. **Environment Variables** (Production):

   | Name | Example value |
   |------|----------------|
   | `NEXT_PUBLIC_API_URL` | `https://sdt-backend.onrender.com/api` |
   | `NEXT_PUBLIC_AI_URL` | `https://sdt-ai.onrender.com` |
   | `NEXTAUTH_URL` | `https://YOUR-PROJECT.vercel.app` (after first deploy, copy real URL and redeploy) |
   | `NEXTAUTH_SECRET` | run `openssl rand -base64 32` locally, paste once |

4. Deploy. Copy the **Production URL** (e.g. `https://fulk-stack.vercel.app`).

5. Go back to **Render → sdt-backend → Environment** → set **`CORS_ORIGIN`** to that exact Vercel URL (no slash at end) → **Manual Deploy**.

---

## Step 4 — Optional: auto-deploy frontend on every push

1. In `frontend` folder locally: `npx vercel link` (log in to Vercel).
2. Open `.vercel/project.json` → copy `orgId` and `projectId`.
3. Vercel → Tokens → create token.
4. GitHub repo → **Settings → Secrets and variables → Actions** add:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID` (= `orgId`)
   - `VERCEL_PROJECT_ID` (= `projectId`)

Pushes to `main` that touch `frontend/` will run `.github/workflows/deploy-vercel.yml`.

---

## Step 5 — Seed demo users (optional)

On your PC:

```bash
cd backend
# create .env with MONGODB_URI=<your Atlas URI>
npm install
npm run seed
```

Then log in on the live site with accounts from `README.md` (e.g. admin / student from seed).

---

## “It’s sleeping / slow”

Free Render services **cold start** after idle (~30–60s). That’s normal for demos.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Browser “CORS” errors | `CORS_ORIGIN` on backend must **exactly** match Vercel URL (e.g. `https://x.vercel.app`). |
| Login / NextAuth error | Set `NEXTAUTH_URL` to the **live** Vercel URL and **redeploy** frontend. |
| API 502 | Check Render logs; usually wrong `MONGODB_URI` or service still deploying. |

More detail: [DEPLOYMENT.md](./DEPLOYMENT.md).
