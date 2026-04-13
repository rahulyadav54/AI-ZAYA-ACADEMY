# Supabase Auth Setup

## 1) Create project
1. Create a Supabase project.
2. Open `Project Settings -> API`.
3. Copy:
   - `Project URL`
   - `anon public` key

## 2) Configure local env
Create `app/.env` from `app/.env.example`:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_SUPABASE_REDIRECT_URL=https://your-domain.vercel.app
```

## 3) Configure auth provider
1. In Supabase dashboard: `Authentication -> Providers -> Email`.
2. Enable Email provider.
3. Choose your preferred behavior:
   - enable email confirmations, or
   - disable confirmations for instant sign-in after register.

## 4) Vercel env variables
In Vercel project settings, add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_REDIRECT_URL`

Then redeploy.

## Notes
- Passwords are stored by Supabase Auth securely (not in your frontend/localStorage).
- User `role` and `name` are stored in Supabase `user_metadata`.
- In Supabase Auth settings, set `Site URL` and `Redirect URLs` to your Vercel domain to avoid localhost links.
