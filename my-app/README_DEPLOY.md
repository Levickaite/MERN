One-click deploy (Vercel)

This project contains a Create React App in the `my-app` folder and an Express backend in `backend`.

Goal: deploy the frontend to Vercel and have it call the backend deployed at https://mern-s9uv.onrender.com

Steps (one-click via Vercel dashboard)

1. Push your repository to GitHub (if not already):
   - Create a new GitHub repo and push the whole project (root contains `package.json` and folders `backend` and `my-app`).

2. Import into Vercel:
   - Open https://vercel.com/dashboard
   - Click "New Project" → "Import Git Repository" and select your repo.
   - IMPORTANT: In the Import settings set the "Root Directory" to `my-app` so Vercel builds the React app.
   - Leave the Build Command as `npm run build` and the Output Directory as `build` (these are default for CRA). The included `vercel.json` already configures this.

3. Set environment variables in Vercel (Project Settings → Environment Variables):
   - Key: `REACT_APP_API_URL`
   - Value: `https://mern-s9uv.onrender.com`
   - Add for `Production` (and `Preview` if you want).

4. Deploy
   - Click "Deploy". Vercel will build and publish your site.

5. CORS
   - Make sure your backend allows the Vercel domain as an origin. If your backend CORS is restrictive you need to add your Vercel URL to the allowed origins or use dynamic origin checking.

Notes
- The frontend reads the API base from `process.env.REACT_APP_API_URL` at build time; setting the environment variable in Vercel is required so the built bundle points to the Render backend.
- If you prefer the frontend to call the backend directly in development, use `my-app/.env` locally (already created) or start the frontend with `REACT_APP_API_URL` set.

If you'd like, I can:
- Add a GitHub Action that automatically deploys to Vercel (not necessary if you use Vercel's integration).
- Add a Render-friendly `render.yaml` for 1-click Render deploy of the backend as well.

