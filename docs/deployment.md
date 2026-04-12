# Deployment Guide — Prime Minds (khalk.co)

## Prerequisites
- Vercel account
- Cloudflare account with `khalk.co` domain
- GitHub repository for the project

## Step 1: Push to GitHub
```bash
cd "d:\New folder\PrimeMinds"
git add .
git commit -m "feat: initial Prime Minds landing page"
git remote add origin https://github.com/[your-username]/prime-minds.git
git push -u origin main
```

## Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import the GitHub repository
4. Vercel auto-detects Next.js — defaults are fine
5. Add environment variables:
   - `NEXT_PUBLIC_SKOOL_URL` = your Skool community URL
   - `NEXT_PUBLIC_YOUTUBE_URL` = your YouTube channel URL
   - (add all other `NEXT_PUBLIC_*` vars from `.env.local`)
6. Click "Deploy"
7. Note the Vercel deployment URL (e.g., `prime-minds-xxx.vercel.app`)

## Step 3: Configure Cloudflare DNS
1. Go to Cloudflare dashboard → `khalk.co` domain
2. Go to DNS → Records
3. Add records:

For root domain (`khalk.co`):
| Type | Name | Value | Proxy |
|------|------|-------|-------|
| CNAME | @ | cname.vercel-dns.com | DNS only (grey cloud) |

For `www` subdomain:
| Type | Name | Value | Proxy |
|------|------|-------|-------|
| CNAME | www | cname.vercel-dns.com | DNS only (grey cloud) |

> ⚠️ **Important:** Set proxy to "DNS only" (grey cloud) to avoid SSL conflicts with Vercel.

## Step 4: Add Domain in Vercel
1. Go to your Vercel project → Settings → Domains
2. Add `khalk.co`
3. Add `www.khalk.co` (and set up redirect to `khalk.co`)
4. Vercel will auto-provision SSL certificate
5. Wait for DNS propagation (usually 5-30 minutes)

## Step 5: Verify
- Visit `https://khalk.co` — should show the landing page
- Visit `https://www.khalk.co` — should redirect to `khalk.co`
- Check SSL (padlock icon)
- Test on mobile

## Vercel Config (vercel.json)
Already created in the project root with:
- Redirect: `www.khalk.co` → `khalk.co`
- Security headers
- Cache control for static assets
