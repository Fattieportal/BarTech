# ✅ Rebranding Voltooid: Bar Technology

## 🎯 Wat is er veranderd?

### Domeinnaam
- **Oud**: `bartech.nl`
- **Nieuw**: `bar-technology.nl`

### Bedrijfsnaam
- **Oud**: `BarTech`
- **Nieuw**: `Bar Technology`

---

## 📝 Alle aangepaste bestanden

### SEO & Metadata
- ✅ `src/app/layout.tsx` - metadataBase, titles, Open Graph, JSON-LD schemas
- ✅ `src/app/sitemap.ts` - baseUrl voor sitemap
- ✅ `src/lib/seo.ts` - baseUrl voor metadata generator
- ✅ `public/robots.txt` - Sitemap URL

### UI Components
- ✅ `src/components/Navigation.tsx` - Logo/branding
- ✅ `src/components/Footer.tsx` - Branding & copyright

### Translations
- ✅ `src/lib/translations.ts` - Alle "BarTech" → "Bar Technology"
  - Testimonials subtitles (NL & EN)
  - Comparison titles (NL & EN)
  - Contact email: `info@bar-technology.nl`

### API Routes & Emails
- ✅ `src/app/api/contact/route.ts` - Email templates
- ✅ `src/app/api/book-appointment/route.ts` - Booking emails & calendar events

### Utilities
- ✅ `src/lib/icsGenerator.ts` - Calendar PRODID & UID domains
- ✅ `src/lib/meetLink.ts` - Google Meet link prefix

---

## 🚀 Deployment Status

### ✅ Code Changes Pushed
```
Commit: c67c1e1
Message: "Rebrand: BarTech → Bar Technology + update domain to bar-technology.nl"
Branch: main
```

### 🔄 Vercel Deployment
- Automatische deployment is **NU BEZIG**
- Check: https://vercel.com/dashboard
- Live URL (na deployment): `https://bar-tech.vercel.app`

---

## 📋 Volgende Stappen

### 1️⃣ Domein Configureren in Vercel
1. Ga naar **Vercel Dashboard** → **bar-tech** project
2. Klik **Settings** → **Domains**
3. Klik **Add Domain**
4. Voer in: `bar-technology.nl`
5. Klik **Add**

Vercel geeft je DNS instructies:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

### 2️⃣ DNS Configureren bij je Registrar
Waar heb je `bar-technology.nl` gekocht?
- **TransIP**: https://transip.nl → Domeinen → DNS
- **Hostnet**: https://hostnet.nl → Domeinen → DNS
- **Versio**: https://versio.nl → Domeinen → DNS

Voeg de DNS records toe die Vercel je geeft!

### 3️⃣ Wacht op DNS Propagation
- Duurt: **10-60 minuten**
- Check status: https://www.whatsmydns.net/#A/bar-technology.nl
- Vercel configureert automatisch SSL (HTTPS)

### 4️⃣ Test Website
Zodra domein actief is, test:
- ✅ Homepage: `https://bar-technology.nl`
- ✅ Contact formulier verstuurt emails
- ✅ WhatsApp button werkt
- ✅ Booking modal maakt Google Calendar afspraak
- ✅ Alle branding zegt "Bar Technology"

### 5️⃣ Google Search Console
1. Ga naar: https://search.google.com/search-console
2. Klik **Add Property** → `bar-technology.nl`
3. Verify ownership (Vercel heeft auto-verification)
4. Submit sitemap: `https://bar-technology.nl/sitemap.xml`

### 6️⃣ Update Social Media (optioneel)
Als je social media hebt, update links:
- LinkedIn profiel
- GitHub bio
- Twitter/X handle
- Instagram bio

---

## 🎨 Brand Consistency Check

### Logo/Naam overal bijgewerkt:
- ✅ Navigation header
- ✅ Footer copyright
- ✅ Email signatures (contact & booking)
- ✅ SEO metadata
- ✅ Open Graph tags (social media previews)
- ✅ JSON-LD structured data (Google)
- ✅ Calendar invite organizer
- ✅ Sitemap
- ✅ robots.txt

### Email Adressen:
- ✅ Contact info: `info@bar-technology.nl`
- ⚠️ **Let op**: Je moet straks je **eigen domein** verifieren bij **Resend** voor custom email!

---

## ⚙️ Environment Variables Check

Deze blijven hetzelfde in Vercel:
- ✅ `POSTGRES_*` - Database credentials
- ✅ `RESEND_API_KEY` - Email API
- ✅ `GOOGLE_*` - Calendar API

**GEEN wijzigingen nodig!**

---

## 📊 SEO Impact

### ✅ Verbeterd:
- Sitemap URL klopt nu
- Metadata baseUrl correct
- Canonical URLs correct
- Open Graph URLs correct

### ⏳ Te doen (na domein setup):
- Submit nieuwe sitemap naar Google Search Console
- Update Google Analytics property (als je apart wilt tracken)
- Check Google rankings (kan 1-2 weken duren voor indexering)

---

## 🔗 Belangrijke URLs

### Development:
- **Localhost**: `http://localhost:3000`
- **Vercel Preview**: `https://bar-tech.vercel.app`

### Production (na domein setup):
- **Main Domain**: `https://bar-technology.nl`
- **WWW**: `https://www.bar-technology.nl` (redirect → non-www)
- **Sitemap**: `https://bar-technology.nl/sitemap.xml`
- **Robots**: `https://bar-technology.nl/robots.txt`

---

## 📞 Email Templates Preview

### Contact Form Email:
```
Van: Bar Technology <onboarding@resend.dev>
Aan: klant@email.com
Onderwerp: ✅ Bericht ontvangen - Bar Technology

...
Met vriendelijke groet,
Bar Technology
```

### Booking Confirmation Email:
```
Van: Bar Technology <onboarding@resend.dev>
Aan: klant@email.com
Onderwerp: ✅ Afspraak bevestiging - Bar Technology

...
Met vriendelijke groet,
Bar Technology
```

---

## 🎯 Success Criteria

Rebranding is 100% compleet als:
- ✅ Alle code pushed naar GitHub (**DONE!**)
- ✅ Vercel deployment succesvol (**IN PROGRESS**)
- ⏳ Domein `bar-technology.nl` wijst naar Vercel
- ⏳ SSL certificaat actief (HTTPS werkt)
- ⏳ Website laadt op `https://bar-technology.nl`
- ⏳ Alle functionaliteit getest

---

## 🚨 Troubleshooting

### Probleem: "Domein werkt niet na DNS setup"
**Oplossing**: Wacht 10-60 min. Check https://www.whatsmydns.net

### Probleem: "Emails komen niet aan"
**Oplossing**: 
1. Check Resend dashboard voor errors
2. Check spam folder
3. Later: verify custom domain bij Resend voor `@bar-technology.nl`

### Probleem: "SSL certificaat error"
**Oplossing**: Vercel configureert dit automatisch na DNS propagation (max 24u)

---

## ✅ Deployment Checklist

- [x] Code wijzigingen gemaakt
- [x] Alle "BarTech" vervangen door "Bar Technology"
- [x] Alle "bartech.nl" vervangen door "bar-technology.nl"
- [x] Git commit & push naar GitHub
- [ ] Vercel deployment succesvol
- [ ] Domein gekocht: `bar-technology.nl`
- [ ] DNS records ingesteld bij registrar
- [ ] Domain toegevoegd in Vercel
- [ ] DNS propagation voltooid
- [ ] SSL certificaat actief
- [ ] Website test: formulieren, booking, WhatsApp
- [ ] Sitemap gesubmit naar Google Search Console

---

**Status**: Rebranding code **COMPLEET** ✅  
**Wachtend op**: Domein configuratie & DNS setup ⏳

Zodra je `bar-technology.nl` hebt gekocht en DNS hebt ingesteld, is alles live! 🚀
