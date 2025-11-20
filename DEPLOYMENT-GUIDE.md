# 🚀 Deployment Guide: Van Localhost naar Live

## 📦 Optie 1: Vercel (Aanbevolen!)

### Waarom Vercel?
- ✅ **Gratis** voor personal projects
- ✅ **Automatisch deployen** bij elke Git push
- ✅ **Next.js optimized** (gemaakt door zelfde team)
- ✅ **SSL gratis** (HTTPS automatisch)
- ✅ **Environment variables** support
- ✅ **Custom domain** gratis
- ✅ **Global CDN** = supersnelle website
- ✅ **Preview URLs** voor elke branch

---

## 🎯 Vercel Setup (15 minuten)

### Stap 1: Maak GitHub Repository

**Als je nog geen GitHub repo hebt:**

```bash
# 1. Ga naar github.com en maak nieuwe repo aan
# 2. Naam: "bartech-website" (of wat je wilt)
# 3. Private of Public (jouw keuze)
# 4. NIET initialiseren met README (je hebt al code)

# 5. In VS Code terminal (in je project folder):
git init
git add .
git commit -m "Initial commit: BarTech website"
git branch -M main
git remote add origin https://github.com/JOUW-USERNAME/bartech-website.git
git push -u origin main
```

**Als je al een GitHub repo hebt via SourceTree:**
- ✅ Perfect! Ga door naar Stap 2

---

### Stap 2: Vercel Account Aanmaken

1. **Ga naar**: https://vercel.com
2. **Klik**: "Sign Up"
3. **Kies**: "Continue with GitHub"
4. **Authorize Vercel** toegang tot je GitHub

---

### Stap 3: Project Importeren

1. **In Vercel Dashboard**, klik: **"Add New Project"**
2. **Import Git Repository** → Selecteer je `bartech-website` repo
3. **Configure Project**:
   ```
   Framework Preset: Next.js (auto-detected)
   Root Directory: ./
   Build Command: npm run build (auto-filled)
   Output Directory: .next (auto-filled)
   Install Command: npm install (auto-filled)
   ```
4. **Klik**: "Deploy"

⏱️ **Eerste deploy duurt ~2 minuten**

---

### Stap 4: Environment Variables Toevoegen

Je `.env.local` variabelen werken niet automatisch op Vercel. Je moet ze handmatig toevoegen:

1. **In Vercel Dashboard** → Je project → **Settings** → **Environment Variables**

2. **Voeg ALLE variabelen toe** uit je `.env.local`:

```bash
# Database
POSTGRES_URL=postgresql://user:pass@host/db
POSTGRES_PRISMA_URL=postgresql://user:pass@host/db?pgbouncer=true
POSTGRES_URL_NO_SSL=postgresql://user:pass@host/db
POSTGRES_URL_NON_POOLING=postgresql://user:pass@host/db
POSTGRES_USER=username
POSTGRES_HOST=your-host.neon.tech
POSTGRES_PASSWORD=your-password
POSTGRES_DATABASE=neondb

# Email
RESEND_API_KEY=re_xxxxxxxxxx

# Google Calendar
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----"
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
GOOGLE_MEET_ROOM=https://meet.google.com/your-room

# NextAuth (als je dat later toevoegt)
NEXTAUTH_URL=https://bartech.nl
NEXTAUTH_SECRET=random-secret-string-hier
```

**Belangrijk**:
- ✅ Kopieer **letterlijk** de waarden uit je `.env.local`
- ✅ Voor `GOOGLE_PRIVATE_KEY`: gebruik de volledige key inclusief `\n` (newlines)
- ✅ Environment: Selecteer **Production, Preview, Development** (alle 3!)

3. **Klik**: "Save"

4. **Redeploy**:
   - Ga naar **Deployments** tab
   - Klik op **"..."** bij laatste deployment
   - Klik **"Redeploy"**

---

### Stap 5: Custom Domain Toevoegen

**Als je al een domein hebt:**

1. **Vercel Dashboard** → Je project → **Settings** → **Domains**
2. **Add Domain** → Voer in: `bartech.nl`
3. **Vercel geeft je DNS instructies**:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. **Ga naar je domain provider** (bijv. TransIP, Hostnet):
   - Login
   - Ga naar DNS instellingen
   - Voeg bovenstaande records toe
   - Sla op

5. **Wacht 10-60 minuten** voor DNS propagation

6. **Vercel configureert automatisch**:
   - ✅ SSL certificaat
   - ✅ HTTPS redirect
   - ✅ www → non-www redirect

**Als je GEEN domein hebt:**
- Je krijgt gratis Vercel URL: `bartech-website.vercel.app`
- Later kun je custom domain toevoegen
- Werkt hetzelfde, alleen andere URL

---

### Stap 6: Automatische Deployments Testen

Nu de magie! 🪄

1. **Maak een kleine wijziging** in je code (bijv. verander tekst in Hero.tsx)

2. **Commit & Push via SourceTree**:
   ```
   - Stage changes
   - Commit message: "Test automatische deployment"
   - Push naar GitHub
   ```

3. **Ga naar Vercel Dashboard** → **Deployments**:
   - Je ziet automatisch nieuwe deployment starten! ⚡
   - Status: Building... → Deploying... → Ready (30-60 sec)

4. **Check je live website**:
   - Wijziging is automatisch live! 🎉

---

## 🎨 Vercel Features

### Preview Deployments (Super Handig!)

**Elke Git branch krijgt eigen preview URL**:

```bash
# Maak nieuwe branch voor feature
git checkout -b feature/nieuwe-sectie

# Maak wijzigingen, commit, push
git push origin feature/nieuwe-sectie

# Vercel maakt automatisch preview:
# https://bartech-website-git-feature-nieuwe-sectie-username.vercel.app

# Test feature → Als goed: merge naar main → automatisch live!
```

### Environment-Specific Settings

```
Production = main branch → bartech.nl
Preview = andere branches → preview-url.vercel.app
Development = local → localhost:3000
```

### Analytics (Gratis)

Vercel heeft ingebouwde analytics:
- Page views
- Top pages
- Unique visitors
- Performance metrics

Enable via: **Settings** → **Analytics** → **Enable**

---

## 🔧 Vercel CLI (Optioneel)

Voor advanced users:

```bash
# Installeer Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy vanaf command line
vercel

# Deploy naar production
vercel --prod

# Check deployment logs
vercel logs
```

---

## 📊 Monitoring & Debugging

### Deployment Logs

Als deployment faalt:
1. **Vercel Dashboard** → **Deployments** → Klik op gefaalde deployment
2. **Building** tab → Zie build logs
3. **Functions** tab → Zie runtime errors

### Runtime Logs

Als je app crashes:
1. **Vercel Dashboard** → **Deployment** → **Functions** tab
2. Zie realtime logs van je API routes en server components

### Error Tracking

Vercel integreert met:
- Sentry (error tracking)
- LogRocket (session replay)
- Datadog (monitoring)

---

## 💰 Vercel Pricing

### Hobby Plan (GRATIS):
- ✅ Onbeperkte deployments
- ✅ Onbeperkte bandwidth
- ✅ SSL certificaat
- ✅ 100GB bandwidth/maand
- ✅ Custom domains
- ✅ Preview deployments
- ✅ Edge Functions
- ✅ Analytics (basic)

**Beperkingen**:
- 1 team member (jij)
- 100GB bandwidth/maand (genoeg voor 10.000+ bezoekers)
- 100 uur build time/maand (genoeg!)

### Pro Plan ($20/maand):
- ✅ Alles van Hobby
- ✅ 1TB bandwidth
- ✅ Advanced analytics
- ✅ Team collaboration
- ✅ Password protection
- ✅ Priority support

**Voor jou**: Start met **Hobby (gratis)**, upgrade later als nodig!

---

## 🆚 Alternatieven (Als je Vercel niet wilt)

### Optie 2: Netlify
- Ook gratis tier
- Automatische deployments
- Minder Next.js optimized dan Vercel
- Setup: Vergelijkbaar met Vercel

**Setup**:
1. https://netlify.com → Sign up met GitHub
2. Import repo
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add env vars in Settings

### Optie 3: Railway
- $5/maand (geen gratis tier meer sinds 2023)
- Database hosting included
- Docker support
- Automatische deployments

**Setup**:
1. https://railway.app
2. Connect GitHub
3. Select repo
4. Auto-detected Next.js config
5. Add env vars

### Optie 4: DigitalOcean App Platform
- $12/maand (Basic tier)
- Meer controle dan Vercel
- Eigen VPS mogelijk
- Automatische deployments

**Setup**:
1. https://digitalocean.com/products/app-platform
2. Connect GitHub
3. Configure build settings
4. Add env vars

### Optie 5: Hostinger VPS (Handmatig)
- ~€10/maand
- Volledige controle
- Geen automatische deployments (moet je zelf opzetten)
- Meer technische kennis nodig

**Niet aanbevolen** voor jouw use case - teveel werk!

---

## ✅ Aanbeveling Voor Jou

**Gebruik Vercel** omdat:

1. ✅ **Gratis** (je betaalt alleen voor domein)
2. ✅ **Zero config** (werkt direct met Next.js)
3. ✅ **Automatische deployments** (precies wat je wilt!)
4. ✅ **Best performance** (Edge Network wereldwijd)
5. ✅ **Environment variables** (je .env werkt)
6. ✅ **Preview URLs** (test features voor live)
7. ✅ **SSL gratis** (HTTPS automatisch)
8. ✅ **Debugging tools** (logs, analytics)

---

## 🚨 Checklist Voor Live Gaan

### Voor Deployment:
- [ ] GitHub repo aangemaakt en code pushed
- [ ] .env.local variabelen klaar om te kopiëren
- [ ] Database (Neon) werkt en is accessible (niet localhost!)
- [ ] Resend API key geldig
- [ ] Google Calendar API credentials geldig

### Vercel Setup:
- [ ] Vercel account aangemaakt
- [ ] Project geïmporteerd
- [ ] Environment variables toegevoegd
- [ ] Eerste deployment succesvol

### Domain Setup (optioneel):
- [ ] Domein gekocht (bijv. bartech.nl)
- [ ] DNS records ingesteld
- [ ] SSL certificaat actief (auto)
- [ ] www redirect werkt

### SEO Setup:
- [ ] Update `layout.tsx` metadataBase naar live domein
- [ ] Update `sitemap.ts` baseUrl naar live domein
- [ ] Update `seo.ts` baseUrl naar live domein
- [ ] Update `robots.txt` Sitemap URL naar live domein
- [ ] OG image toegevoegd (`/public/og-image.jpg`)
- [ ] Favicon toegevoegd (`/public/favicon.ico`)

### Post-Deployment:
- [ ] Test alle pagina's (home, about, diensten, contact)
- [ ] Test contactformulier (verstuurt email?)
- [ ] Test WhatsApp button (opent correct?)
- [ ] Test booking modal (maakt afspraak?)
- [ ] Check mobile responsiveness
- [ ] Submit sitemap naar Google Search Console
- [ ] Enable Vercel Analytics

---

## 🆘 Troubleshooting

### "Build Failed"
**Probleem**: Deployment faalt tijdens build  
**Oplossing**: 
```bash
# Check build errors in Vercel logs
# Vaak: missing dependencies of TypeScript errors

# Test local build:
npm run build

# Fix errors, commit, push
```

### "Environment Variables Not Working"
**Probleem**: API calls falen op Vercel  
**Oplossing**:
- Check of alle env vars toegevoegd zijn
- Check of naming EXACT klopt (hoofdlettergevoelig!)
- Redeploy na toevoegen env vars

### "Database Connection Failed"
**Probleem**: Kan niet verbinden met Neon database  
**Oplossing**:
- Check of Neon database publiek toegankelijk is (niet localhost!)
- Check connection string in env vars
- Vercel IP whitelisting: Neon staat alle IPs toe by default

### "Email Sending Failed"
**Probleem**: Contactformulier verstuurt geen emails  
**Oplossing**:
- Check Resend API key in env vars
- Check Resend domain verification
- Check logs in Vercel Functions tab

### "Google Calendar API Failed"
**Probleem**: Bookings werken niet  
**Oplossing**:
- Check Google service account credentials in env vars
- Check of calendar gedeeld is met service account email
- Check private key formatting (moet `\n` bevatten voor newlines)

---

## 📞 Hulp Nodig?

Als je vastloopt tijdens deployment:

1. **Check Vercel Logs** (99% van problemen zijn hier te zien)
2. **Google de error** (vaak Vercel-specific oplossingen)
3. **Stuur mij**:
   - Screenshot van error
   - Deployment logs
   - Wat je probeerde te doen

Ik help je troubleshooten! 🚀

---

**Ready to go live?** 

Start met Stap 1: Push je code naar GitHub! 🎉
