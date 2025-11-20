# ⚡ Quick Start: Live Gaan in 10 Stappen

## 🎯 Doel
Van localhost naar live website met automatische deployments bij elke Git push via SourceTree.

---

## ✅ Checklist

### 1️⃣ **Controleer Je Code** (2 min)
```bash
# Test of alles werkt:
npm run build

# Als geen errors → je bent klaar voor deployment! ✅
```

---

### 2️⃣ **Push Naar GitHub** (5 min)

**Via SourceTree:**
1. Open SourceTree
2. Klik **"Stage All"** (alle veranderingen selecteren)
3. Commit message: `"Ready for deployment"`
4. Klik **"Commit"**
5. Klik **"Push"** (bovenaan)

**Nog geen GitHub repo?** Volg DEPLOYMENT-GUIDE.md Stap 1 eerst!

---

### 3️⃣ **Vercel Account** (2 min)
1. Ga naar: **https://vercel.com**
2. Klik: **"Sign Up"**
3. Kies: **"Continue with GitHub"**
4. Authorize Vercel ✅

---

### 4️⃣ **Import Project** (3 min)
1. In Vercel Dashboard: **"Add New Project"**
2. Selecteer je GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Klik: **"Deploy"**

⏱️ Wacht ~2 minuten... ☕

---

### 5️⃣ **Environment Variables** (10 min)

**BELANGRIJK!** Anders werken je formulieren/bookings niet.

1. **Vercel** → Je project → **Settings** → **Environment Variables**

2. **Kopieer deze uit je `.env.local`:**

```bash
# Database (Neon)
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NO_SSL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# Email (Resend)
RESEND_API_KEY=

# Google Calendar
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_CALENDAR_ID=
GOOGLE_MEET_ROOM=
```

3. **Voor elke variable**:
   - Name: (naam van variable)
   - Value: (waarde uit .env.local)
   - Environment: **Selecteer alle 3** (Production, Preview, Development)

4. **Save**

5. **Redeploy**:
   - **Deployments** tab
   - Klik **"..."** bij laatste deployment
   - Klik **"Redeploy"**

---

### 6️⃣ **Test Je Website** (5 min)

Vercel geeft je URL: `https://jouw-project.vercel.app`

Test:
- [ ] Homepage laadt?
- [ ] Navigatie werkt?
- [ ] Contact formulier verstuurt? (check je email!)
- [ ] WhatsApp button opent?
- [ ] Booking modal werkt?

**Alles werkt?** → Ga door! 🎉  
**Iets werkt niet?** → Check Vercel logs (zie DEPLOYMENT-GUIDE.md troubleshooting)

---

### 7️⃣ **Custom Domain** (Optioneel - 15 min)

**Als je al een domein hebt:**

1. **Vercel** → Settings → **Domains**
2. Add: `bartech.nl` (jouw domein)
3. Vercel geeft DNS instructies:
   ```
   A Record: @ → 76.76.21.21
   CNAME: www → cname.vercel-dns.com
   ```
4. Ga naar je **domain provider** (TransIP, Hostnet, etc.)
5. DNS instellingen → Voeg records toe
6. Save
7. Wacht 10-60 min voor propagation

**Geen domein?** Gebruik gewoon Vercel URL (werkt perfect!)

---

### 8️⃣ **Update SEO URLs** (5 min)

Nu je live bent, update deze bestanden:

**src/app/layout.tsx:**
```tsx
metadataBase: new URL('https://jouw-domein.nl'), // Update hier!
```

**src/app/sitemap.ts:**
```tsx
const baseUrl = 'https://jouw-domein.nl'; // Update hier!
```

**src/lib/seo.ts:**
```tsx
const baseUrl = 'https://jouw-domein.nl'; // Update hier!
```

**public/robots.txt:**
```
Sitemap: https://jouw-domein.nl/sitemap.xml
```

**Commit & Push via SourceTree** → Automatisch deployed! 🚀

---

### 9️⃣ **Test Automatische Deployment** (3 min)

Nu de magie testen! 🪄

1. **Maak kleine wijziging** (bijv. verander tekst in Hero)
2. **SourceTree**:
   - Stage changes
   - Commit: "Test auto-deployment"
   - Push
3. **Check Vercel Dashboard** → Deployments
   - Zie automatisch nieuwe deployment! ⚡
4. **Check je website** na 30-60 sec
   - Wijziging is LIVE! 🎉

**GEFELICITEERD!** Nu deployt elke push automatisch! 🎊

---

### 🔟 **Google Search Console** (10 min)

Zodat Google je kan vinden:

1. Ga naar: **https://search.google.com/search-console**
2. **Add Property** → Voer domein in
3. **Verify ownership**:
   - Copy verification code
   - Vercel → Settings → Domains → Add TXT record
   - Of: Upload HTML file naar /public folder
4. **Submit Sitemap**:
   - URL: `https://jouw-domein.nl/sitemap.xml`
   - Klik: "Submit"

✅ **Done!** Google indexeert je site binnen 1-7 dagen.

---

## 🎉 Je Bent Live!

### Vanaf Nu:

**Elke keer dat je pusht via SourceTree:**
```
1. Maak wijzigingen in VS Code
2. Save files
3. SourceTree: Stage → Commit → Push
4. Vercel deployt automatisch (30-60 sec)
5. Live! 🚀
```

### Preview Deployments (Bonus!):

**Test features VOOR je live gaat:**
```bash
# Maak nieuwe branch in SourceTree
feature/nieuwe-sectie

# Maak wijzigingen, commit, push
# Vercel maakt preview URL:
https://jouw-project-git-feature-nieuwe-sectie.vercel.app

# Test → Als goed: merge naar main → automatisch live!
```

---

## 📊 Monitoring

### Check Wekelijks:
- **Vercel Analytics** → Hoeveel bezoekers?
- **Google Analytics** → Waar komen ze vandaan?
- **Microsoft Clarity** → Hoe gebruiken ze je site?
- **Google Search Console** → Welke keywords?

### Vercel Dashboard:
- **Deployments**: Alle deployments + status
- **Analytics**: Bezoekers, pageviews
- **Logs**: Errors en debugging
- **Usage**: Bandwidth, build time

---

## 🆘 Problemen?

### Build Faalt?
```bash
# Test local:
npm run build

# Fix errors → Commit → Push
```

### Website Crashed?
- Vercel → Deployments → Laatste → Functions tab → Check logs

### Environment Variables Werken Niet?
- Settings → Environment Variables → Check spelling
- Redeploy na toevoegen/wijzigen

### Deployment Te Langzaam?
- Normaal: 30-60 seconden
- Check Vercel Status: https://vercel-status.com

---

## 💡 Pro Tips

### 1. Commit Messages
Gebruik duidelijke messages:
```
✅ "Fix contact form email sending"
✅ "Add new testimonial section"
✅ "Update hero headline"

❌ "update"
❌ "fix"
❌ "test"
```

### 2. Branch Workflow
```
main = production (LIVE website)
develop = staging (test hier eerst)
feature/* = nieuwe features

Test feature → Merge develop → Merge main
```

### 3. Rollback
Als deployment iets breekt:
- Vercel → Deployments → Previous deployment → "Promote to Production"
- Instant rollback! ⚡

### 4. Monitoring
Enable alles:
- Vercel Analytics (Settings → Analytics)
- Error tracking (optioneel: Sentry.io)
- Uptime monitoring (optioneel: UptimeRobot)

---

## 🎓 Volgende Stappen

Nu je live bent:

1. **Week 1**: Monitor errors, fix bugs
2. **Week 2**: Google Search Console data bekijken
3. **Week 3**: Eerste content updates
4. **Week 4**: Analyseer traffic, verbeter conversie

Gebruik **ANALYTICS-IMPROVEMENT-GUIDE.md** voor wekelijkse reviews!

---

**Klaar om live te gaan?** Start bij stap 1! 🚀

Veel succes! 🎉
